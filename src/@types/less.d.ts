// src/@types/less.d.ts
declare module "*.module.less" {
    const classes: {
        readonly [key: string]: string;
    };
    export default classes;
}