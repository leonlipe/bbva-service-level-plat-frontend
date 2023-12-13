import axios from 'axios';

export const instanceAxiosAPI = axios.create({
  baseURL: `https://build-d04250b7-dot-dev-bbva-service-level-plat-sp.ew.r.appspot.com`,
  withCredentials: true ,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json", Accept: "application/json",
    "Access-Control-Allow-Credentials": true,
    'Cookie': '__Host-GCP_IAP_AUTH_TOKEN_6C6344489EFDEA3E=ASIj7Mgx2f0LazsdlKBHVs9MTWyb4KylgLL2Syygn1Bgg7lFyXTMY9Wc9mmjhDcgEh2uJ-cT925YPFGsiNmBh8KsNfFM4wtP83HaCEB4KhWnXMNk4e1cJUBz_2lsXL60iWoS0ooyW2T7IoVE_sq3_5skGTHVq_CsOR6CEKMz92HYtiASeh8JHTvIXprr7-VcSpwKMKCA6EvFbaPdLdykdkTAM3fo2bIAu1r6Z_feSUTMHtCgQ30H4S1gvJ_2x4hOi9Cnw6XmJkhgwsEYBuUGxg_9k4rZYkqFhNXQ9C401YJpXfu1RqSHuv6bi8MoAp4LVZju7nyp74ctLlpiqkjLQdT40wk_HjQYMn21Z1YiIgXmF_nI8jthdO9BmXckqfetK3m4OT-mPd0-w3eXF9VSxmJsOEWxfwS7GQDpF8kDKrqivhaVclsK8DtkVdKr6BHzsW7PlVhADnyIFQAvYb78cClnht0oe19JEz01ky_J9BNGV45TjnBPaLKynuJRUQkS5NluIgOeeMa3c6FkFdeVs5NKS652pgtAOA8Z857tsWRmk1DiTo9tWY_dkZ73tAFFJWDYvVbZ1VGw_ACktezb8ctQgzAwwKuMixY24GAki1a2G2qdYsgNdTTfPG7ACMhq_-aQsSRwNfT8haiLFBgFJJnsJlEfbMiGoTjBXjVXM2h0cqBmmUgaxoOHWJ_OgVwHdAMahheCENGb8VCkl2vg4WjnD1NnFjO3YIbjeDR69eLtxzvHsSpBeYNSm7uv7NH0J5byKN_fokDu4BzRyNu8uW94HA-fFfsq_ngHvZuBaWHCxfFUkJXQIXMDOEj91yvcmyKperSxfElolETMBNf_ai3HhQC8eto7on8dQb2OApu_W4ZiNIt5KQ_cYGTy_Kxde5OoxJosKCVqz9gVWXNlfxekF6Tr0U3qqx8SGwKW7VqTQS6Vq56PcUnhuOlFrZ22x_K4AyflVmzA1DxGA_JcKaX9A0FDHvUid1Ars6XXfGkQVxEwwDbbSwUaGC0a8cgrwpN0WcpeqTuksmuIpXD--kwJpWSvQ79kC91kiETHWrzicMYhC_sQBsXaplrthIWiFcV8XXCkP1kKwxOatAE3codVJ7lPzEcj7LbxrvH9AqzMTgw00NGCNJapOltxeT7DHZNUtFxp3TCM_PKRMJvl34NttMgkhWmRjg5-PS61mxS2e7nLb0uIsWeXtQTmswl55shESaQIvH_j7QWzJF6_YD8drH-QdgvswfEZaHqL0FSGtND8S0_U-Iw2t89m4NEc3Hi6IcpQodaLaknuzpv1B3EdOAJE4JhEqcYOEfu5iV_l3omy5aM_-GHmtGKSH6xSpR-sWCqDCKrDZHBsHfIW1YwGB2VdQ5IEar0FekrzGdYW70kcXex4hfW9WUNW2jls9OfeP0c6KfabwO0vXld08c3eCSEUA6kjKvP6gM3piGHNZouUUiv9SxqeOyLHhOz6zjBO-UwjwnaJ1sfp3chL-9pA9u4swBR3t10FsR1dRz38l1eXYaw4OHL-N60zrnoGJ2BCJKUXUeAYi0NybWyvd4m2DuYdKqJjRxGmzQaqdFJ3UE1J2-qx9vO5sAadAAW6kjzXFrTK7PIc7KS4v5EVvyaBg0R6tyLtX_h_AbTKkurVb5iOu1KA2g03IwUQd6taCBahFal5lwrh4N1JCkSwcSSebumOgLS6CfXZPgcPWB7JIIKyJXwNoeCo9RwYqZQMdS7HP_wNq8GIFNMruAuUF4nEqWZ25L6r1j2ATD_IvwTbSbNZx_y9FZK4qmvIqDWiWQNHglgnP-Px_8RtBUwYAGE8P1wKdEAwtNRaPajRjktkM0KVN-vL3TpytoVaGG3bmH6-WrZZvQBsvJ_931GoxC71CsOMuIKFzJx_YYQo2RKUb-q05Eh0iRHtqqbqJxkd1FHBrQhaFeMT2uvaKXRP8-CnIg; Path=/; Expires=Wed, 11 Dec 2024 21:02:48 GMT;'
  },
});

const promise = (url, data = {}) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 300);
  })
);

export const instanceAPI = {
  get: promise,
  post: promise,
  patch: promise,
  delete: promise,
};

export default instanceAPI;
