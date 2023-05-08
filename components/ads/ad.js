import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { AD_CLIENT_ID } from '../../const';

let adsbygoogle;
export default function AdSense({}){
    const { asPath } = useRouter();

    // useEffect(() => {
    //     try {
    //         (adsbygoogle = window.adsbygoogle || []).push({});
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [asPath]);

    return <span key={asPath}></span>
    // return <div key={asPath}>
    // <ins
    //   className="adsbygoogle"
    //   style={{ display: "block" }}
    //   data-ad-client={AD_CLIENT_ID}
    //   data-ad-slot="7806394673"
    //   data-ad-format="auto"
    //   data-full-width-responsive="true"
    // /></div>;
};