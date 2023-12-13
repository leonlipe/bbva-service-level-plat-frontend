import axios from 'axios';

export const instanceAxiosAPI = axios.create({
  baseURL: `https://build-d04250b7-dot-dev-bbva-service-level-plat-sp.ew.r.appspot.com`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", Accept: "application/json",
    "Access-Control-Allow-Credentials": true,
    'Cookie': '__Host-GCP_IAP_AUTH_TOKEN_6C6344489EFDEA3E=ASIj7Mic89vGlg_adMFkLWIbrp4flNH29sbi3tfDPfkJC1YLLLATVOjkj9q6FmoUKL4l5dKDCq39pBTD9vBc6WvDsLQoq_ylGNSZZRcifXm-Lr8f1IeI0a3bokLElQchoed2uNGVus0b9DOi2GuAVf-ndB7xvPvNKrL62D24nAS6J9K9d8ZxPuuNjGN9Sqt7YFGmnLksBN0YUpRjCu-3kbbgS50Zw-eDJUO33HvmOHpCQNV2UNbWwWFVl35W1ppa2BgPJTvlxlMpBSuBIZfR60lEu_0js2hCn3p1AdekYT0v1a43WiPBPmEFYd_ez5xgaL0nRoIDD3QtvD_1jV2UMqLBvqBu8G28_ZuNcRmgLWLVG2dorRkCqkzw7kJc45EOclvhg3p8DmDrJExVD_zlDGawvyehAf0xXvJC-trXwWdJtdDj5MDCTBPnyE6HnM_rcS5BFbVXYniZkEz44CLVoilYs1t9N0KHaDaF01JBU5bPGWlvf5Cts49AiDL1ufbbFC0rCf-cHJxdJG_P8t6OApDOXIM3fhhTeXPufR1fAQRL04Ow3e_FKgPj3W8plqIThifHK610WpAVqkQs27-YwgUo5pYahH7AgNapQHv-PpcdXI5OpCdKkPC5zc8qTl4qdo5D8cKWL7qZD1up0o8TTKlKNxYsayZnE-iJwgOGNQDFSuertotoX4IYk0gaeNWfOOREyhHq1ZutAXtOTI1pzGpj1gTDpxHxFsQ0nCk_0ru4FBP9wUruBS7eSW-ApvuaDv5VsFpjQvyQMAJKrfh3Hdy2Fr4NcPXCR4y8FEqQ1o3F0j6pMNdu8M87xs4Jt4X63p3DxNI8yLEmr_X-e4mwb4QkZqrnHUtWLKn4h13-uLAKjqArJmkxQmzzN7_SHYiEX08wdAGfZFdC1ayaMObHmqWelJbT7wQVXIJJ8t4BTQvguERUf_yTVSMjM1GCj7GnCcYnlxkj51IpcdVzWu3mZUAyu8QIsEZdAV-vqWDLrKmZCR3sNtFMgH2rnbb-TuOAbQofa6wpwwZHyElkyJJ5PL9SrofMhgc2bR5DxEfRIysiZ2l-LHeEgyQQsYplmu9PpB1B6WhDhIVcdYgHmAVEs6dAxU9wTswOLhncUwTE0dGvRJ-DrauPKDqMM_haUfMt46Xc0FfOu82OzxpQE_tSF1yuuz7eGrEya1b3T3HL2k19Ub-sWjkcvoUZoEfWFXPw_Q5W5vf6usfwVNc-HnrgMysQDCK3UkEiRtxkKmUG40ErN72bmug3-NjpGNf434Rs76emnq8-OYnsN8fQbQKosejFtDD7Bl7JHHW-ewC-H3kkDAjeemvyCWOsH9evQXl2XiOTMnArPZMF-wpvdqZjQ2u3xUPaemWC62_fVzdygHE87aXuuwyH8Rm4x1OPGAd7okdaKnJ0ZRIEeFdnHeoFKt0PeqQ-r-U5LVd-Uc7L_A5Mw00QjoGjbh0jdv99OLzzp5YW_AkAi4NbvfgIBzvZRhL0dzDLZp6b-xoZL4eJwXr-L7sgI2znGjgn-743Hqo_3eegUAbZTem_pJ1ORu_1joa5jls5FSQ2reGpPZnoO04_lSmt8NJLdoxDTdfqM5OqZU__6LxiVVAGJbyExRiwDrjx3Fe-leRC3FMLHl_Hdg98YfSc3TjvJ_H_Im49TRb7cV7vBR8UXFt8GBV-uxWz-clsNcCaK36ZQ46SjjiB8_X0AeRJgs8IPauEZqKfjabEP4Zkxz1HX1f2frLqlk50w4tx9V5kVd-NWZAuD8OYt4LOax-z7ODZnECpfMGV5qiO2VgAIs5uAeEsJdVBZ7EGHdjUqLWfR6IkCr3m7HbforE6VI9y8eJqTEJoumirL9Fi8_EiuFOdBwOcBMJB-VjK5O5Y4W_BFMUzLCGqHjzGvrDNTmYnElxSDrxZqKa-J4dxorInqDGiyEbC5bQ-Zxfa79-qmg'
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
