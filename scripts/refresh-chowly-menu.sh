set -e

environment="${1:-local}"

# Map environment to URL
case $environment in
  local)
    url="http://localhost:3000"
    ;;
  development)
    url="https://api.dev.opencourier.io"
    ;;
  production)
    url="https://api.opencourier.io"
    ;;
  *)
    echo "Unknown environment: $environment"
    exit 1
    ;;
esac

sqlite3 ./restaurant-export/db.sqlite "select POSIntegrationNumber from restaurants where POSIntegration = 'CHOWLY' AND OnboardingCohort = 1" | \
while read line; 
do
curl --fail --location $url'/v1/chowly/refresh' \
--header 'Content-Type: application/json' \
--data '{
    "externalBusinessId": "'$line'"
    }'
done
