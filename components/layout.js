import Head from "next/head";
import Navbar from './navbar'
import Footer from './footer'
import { GENRE_LIST, AD_CLIENT_ID } from "../const";
import AdSense from '../components/ads/ad'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。このページでは時間管理に関するツールや管理方法などについて記載します。Toggl / Timely" />
        <meta property="og:image"  contents="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153944.jpg"></meta>
      </Head>
      <Navbar />
      <AdSense slot={'aaa'}/>
      <nav className="navbar navbar-expand navbar-light bg-dark gnav">
        <div className="text-center text-white ">
          <ul className="nav nav-pills nav-fill">
            {GENRE_LIST.map((genre) => {
            return (
              <li className="nav-item" key={genre.name}>
                <a className="nav-link text-white" aria-current="page" href={genre.url}>
                  {genre.name}
                </a>
              </li>
            )
            })}
          </ul>
        </div>
      </nav>
      <main>{children}</main>
      <Footer />
    </>
  )
}

