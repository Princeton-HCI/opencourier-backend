import { ICourierMatcherInput } from "./ICourierMatcherInput";
import { ICourierMatcherResult } from "./ICourierMatcherResult";

export interface ICourierMatcherService {
	findCourierForDelivery(input: ICourierMatcherInput): Promise<ICourierMatcherResult | null>
}
