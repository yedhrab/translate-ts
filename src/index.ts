import { translate } from "@vitalets/google-translate-api";
import createHttpProxyAgent from "http-proxy-agent";


// https://free-proxy-list.net (google: yes)
const proxies: string[] = []


async function google_translate(proxy_index: number | undefined = undefined): Promise<string> {
    const agent = createHttpProxyAgent(proxies[proxy_index || 0]);
    try {
        const { text } = await translate("Hello, world!", { to: "tr", fetchOptions: { agent } });
        return text
    } catch (error) {
        if (error.name === "TooManyRequestsError") {
            return google_translate(proxy_index + 1 || 1);
        }
        else {
            console.error(error);
        }
    }
}

const text = await google_translate()
console.log(text)
