/// <reference types="node" />
/// <reference types="./express" />


declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: string;
        readonly PUBLIC_URL: string;
        readonly NODE_PATH: string;
        readonly NODE_ENV: "development" | "production";
    }
}
