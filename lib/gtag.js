export const pageview = (url) => {
    window.gtag("config", 'G-7K32FX1NCM', {
      page_path: url,
    });
};