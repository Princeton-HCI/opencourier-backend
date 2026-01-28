import * as swagger from '@nestjs/swagger'
import * as common from '@nestjs/common'
import { Request, Response } from 'express'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { PUBLIC_API_V1_PREFIX } from '../../../constants'
import { ConfigDomainService } from '../../../domains/config/config.domain.service'
import { UserDomainService } from '../../../domains/user/user.domain.service'
import { MetadataPublicDto } from './dtos/metadata.public.dto'
import { Public } from '../../../decorators/public.decorator'
import { normalizeRegionForPostGIS } from '../../../utils/geoJsonUtils'

@swagger.ApiTags('public')
@common.Controller('')
export class InstanceDetailsPublicRestApiController {
  constructor(
    private readonly configDomainService: ConfigDomainService,
    private readonly userDomainService: UserDomainService
  ) {}

  private async getDetails() {
    const details = await this.configDomainService.instanceConfig.getDetails()
    if (!details) {
      throw new common.NotFoundException('Instance details not found')
    }
    return details
  }

  private async processMarkdown(markdown: string | null | undefined): Promise<string> {
    if (!markdown) return ''

    // Convert markdown to HTML
    const html = await marked(markdown)

    // Sanitize the HTML to prevent XSS attacks
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title'],
        a: ['href', 'name', 'target', 'rel'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    })
  }

  @Public()
  @common.Get('metadata')
  @swagger.ApiOkResponse({ type: MetadataPublicDto })
  @swagger.ApiNotFoundResponse({ description: 'Instance details not found' })
  async getMetadata(): Promise<MetadataPublicDto> {
    const instanceConfig = await this.configDomainService.instanceConfig.getInstanceConfigSettings()
    const userCount = await this.userDomainService.countAll()

    if (!instanceConfig.details) {
      throw new common.NotFoundException('Instance details not found')
    }

    // Normalize region for PostGIS
    if (instanceConfig.details.region) {
      instanceConfig.details.region = normalizeRegionForPostGIS(instanceConfig.details.region)
    }

    return new MetadataPublicDto(instanceConfig, userCount)
  }

  private renderHtml(title: string, content: string, details: any): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${details.name} - ${title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              max-width: 900px;
              margin: 0 auto;
              padding: 40px 20px;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
            }
            .container {
              background-color: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header {
              display: flex;
              align-items: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #eee;
              padding-bottom: 20px;
            }
            .logo {
              width: 60px;
              height: 60px;
              margin-right: 20px;
              border-radius: 8px;
              background-color: #f0f0f0;
              overflow: hidden;
              flex: 0 0 60px;
            }
            .logo img {
              width: 60px;
              height: 60px;
              object-fit: cover;
              border-radius: 8px;
            }
            .header-text h1 {
              margin: 0;
              font-size: 28px;
            }
            .header-text p {
              margin: 0px 0 0 0;
              color: #666;
              font-size: 16px;
            }
            .content {
              font-size: 16px;
              line-height: 1.8;
              color: #444;
            }
            .content h2, .content h3 { color: #222; }
            .content a { color: #0066cc; text-decoration: none; }
            .content a:hover { text-decoration: underline; }
            .content ul, .content ol { margin: 15px 0; }
            .content li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              ${details.imageUrl ? `<div class="logo"><img src="${details.imageUrl}" alt="${details.name}"></div>` : ''}
              <div class="header-text">
                <h1>${details.name}</h1>
                <p>${title}</p>
              </div>
            </div>
            <div class="content">
              ${content}
            </div>
          </div>
        </body>
      </html>
    `
  }

  private respondWithContentNegotiation<T extends Record<string, any>>(
    req: Request,
    res: Response,
    title: string,
    jsonData: any,
    details: any
  ): void {
    const acceptHeader = (req.get('accept') || '').toLowerCase()

    // Default to JSON unless client explicitly prefers HTML
    if (!acceptHeader.includes('text/html')) {
      res.json(jsonData)
      return
    }

    const contentValue = Object.values(jsonData)[0]
    const html = this.renderHtml(title, String(contentValue ?? ''), details)
    res.type('text/html').send(html)
  }

  @Public()
  @common.Get('privacy-policy')
  @swagger.ApiOkResponse({
    description: 'Instance privacy policy content',
    schema: {
      type: 'object',
      properties: {
        privacyPolicyContent: { type: 'string' },
      },
    },
  })
  @swagger.ApiNotFoundResponse({ description: 'Instance details not found' })
  async getPrivacyPolicy(@common.Req() req: Request, @common.Res() res: Response) {
    const details = await this.getDetails()
    const acceptHeader = (req.get('accept') || '').toLowerCase()

    // Default to JSON unless client explicitly prefers HTML
    if (!acceptHeader.includes('text/html')) {
      res.json({ privacyPolicyContent: details.privacyPolicyContent })
      return
    }

    const processedContent = await this.processMarkdown(details.privacyPolicyContent)
    const html = this.renderHtml('Privacy Policy', processedContent, details)
    res.type('text/html').send(html)
  }

  @Public()
  @common.Get('terms-of-service')
  @swagger.ApiOkResponse({
    description: 'Instance terms of service content',
    schema: {
      type: 'object',
      properties: {
        termsOfServiceContent: { type: 'string' },
      },
    },
  })
  @swagger.ApiNotFoundResponse({ description: 'Instance details not found' })
  async getTermsOfService(@common.Req() req: Request, @common.Res() res: Response) {
    const details = await this.getDetails()
    const acceptHeader = (req.get('accept') || '').toLowerCase()

    // Default to JSON unless client explicitly prefers HTML
    if (!acceptHeader.includes('text/html')) {
      res.json({ termsOfServiceContent: details.termsOfServiceContent })
      return
    }

    const processedContent = await this.processMarkdown(details.termsOfServiceContent)
    const html = this.renderHtml('Terms of Service', processedContent, details)
    res.type('text/html').send(html)
  }

  @Public()
  @common.Get('rules')
  @swagger.ApiOkResponse({
    description: 'Instance rules content',
    schema: {
      type: 'object',
      properties: {
        rulesContent: { type: 'string' },
      },
    },
  })
  @swagger.ApiNotFoundResponse({ description: 'Instance details not found' })
  async getRules(@common.Req() req: Request, @common.Res() res: Response) {
    const details = await this.getDetails()
    const acceptHeader = (req.get('accept') || '').toLowerCase()

    // Default to JSON unless client explicitly prefers HTML
    if (!acceptHeader.includes('text/html')) {
      res.json({ rulesContent: details.rulesContent })
      return
    }

    const processedContent = await this.processMarkdown(details.rulesContent)
    const html = this.renderHtml('Rules', processedContent, details)
    res.type('text/html').send(html)
  }

  @Public()
  @common.Get('description')
  @swagger.ApiOkResponse({
    description: 'Instance description content',
    schema: {
      type: 'object',
      properties: {
        descriptionContent: { type: 'string' },
      },
    },
  })
  @swagger.ApiNotFoundResponse({ description: 'Instance details not found' })
  async getDescription(@common.Req() req: Request, @common.Res() res: Response) {
    const details = await this.getDetails()
    const acceptHeader = (req.get('accept') || '').toLowerCase()

    // Default to JSON unless client explicitly prefers HTML
    if (!acceptHeader.includes('text/html')) {
      res.json({ descriptionContent: details.descriptionContent })
      return
    }

    const processedContent = await this.processMarkdown(details.descriptionContent)
    const html = this.renderHtml('Description', processedContent, details)
    res.type('text/html').send(html)
  }

  @Public()
  @common.Get('about')
  @swagger.ApiOkResponse({
    description: 'Instance about page with key details',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        link: { type: 'string' },
        imageUrl: { type: 'string' },
        region: { type: 'object', nullable: true },
        privacyPolicyUrl: { type: 'string', nullable: true },
        termsOfServiceUrl: { type: 'string', nullable: true },
        rulesContent: { type: 'string' },
        descriptionContent: { type: 'string' },
      },
    },
  })
  @swagger.ApiNotFoundResponse({ description: 'Instance details not found' })
  async getAbout(@common.Req() req: Request, @common.Res() res: Response) {
    const details = await this.getDetails()
    const aboutData = {
      name: details.name,
      link: details.link,
      imageUrl: details.imageUrl,
      region: details.region,
      privacyPolicyUrl: details.privacyPolicyUrl,
      termsOfServiceUrl: details.termsOfServiceUrl,
      rulesContent: details.rulesContent,
      descriptionContent: details.descriptionContent,
    }

    const acceptHeader = req.get('accept') || ''

    if (acceptHeader.includes('application/json')) {
      res.json(aboutData)
      return
    }

    const rulesHtml = details.rulesContent ? await this.processMarkdown(details.rulesContent) : ''
    const descriptionHtml = details.descriptionContent ? await this.processMarkdown(details.descriptionContent) : ''

    const aboutContent = `
      <h2>About ${details.name}</h2>
      <p><strong>Link:</strong> <a href="${details.link}" target="_blank">${details.link}</a></p>
      ${
        details.privacyPolicyUrl
          ? `<p><strong>Privacy Policy:</strong> <a href="${details.privacyPolicyUrl}" target="_blank">View</a></p>`
          : ''
      }
      ${
        details.termsOfServiceUrl
          ? `<p><strong>Terms of Service:</strong> <a href="${details.termsOfServiceUrl}" target="_blank">View</a></p>`
          : ''
      }
      ${rulesHtml ? `<h3>Rules</h3><div>${rulesHtml}</div>` : ''}
      ${descriptionHtml ? `<h3>Description</h3><div>${descriptionHtml}</div>` : ''}
    `

    const html = this.renderHtml('About', aboutContent, details)
    res.type('text/html').send(html)
  }
}
