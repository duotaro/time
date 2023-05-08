import Head from "next/head";
import Link from "next/link";
import { Text } from "./blog/detail/[id].js"
import { getDatabase } from "../lib/notion";
import Layout from '../components/layout'
import Search from '../components/side_widget/search.js'
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export default function Home({ posts }) {


  let tagList = []
  
  for(const item of posts) {
    if(!item){
      continue
    }
    item.properties.Tags.multi_select.map((tag) => {
      if(tagList.indexOf(tag.name) < 0){
        tagList.push(tag.name)
      }
    })
  }


  return (
    <Layout>
      <Head>
        <title>Techvenience - 時間管理 -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mt-5">
        <div className="row">
          <section className="col-lg-8">
          <div className="row gx-4 gx-lg-5 row-cols-sm-2 row-cols-1 justify-content-center">
              {posts.map((post) => {
                const date = new Date(post.last_edited_time).toLocaleString(
                  "ja",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                );
                return (
                    <div className="col mb-5" key={post.id}>
                        <div className="card h-100">
                            <img className="card-img-top border-bottom img-responsive" src={post.properties.Image.url} alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder"><Text text={post.properties.Name.title} /></h5>
                                    <div className="flex-column justify-content-center small text-warning mb-2">
                                      {post.properties.Tags.multi_select.map((tag) => {
                                        return (
                                          <Link href={`/${tag.name}/`} className="bi-star-fill btn btn-outline-secondary m-1" style={{whiteSpace: 'nowrap'}} key={tag.id}>{tag.name}</Link>
                                        )
                                      })}
                                    </div>
                                    {date}
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                  <Link className="btn btn-outline-dark mt-auto link"  href={`/blog/detail/${post.id}/`}>記事を読む</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
              })}
            </div>
          </section>
          {/* Side widgets*/}
          <section className="col-lg-4">
            {/* Search widget*/}
            {/* <Search /> */}
            {/* Categories widget*/}
            <div className="card mb-4">
              <div className="card-header  bg-dark text-white">Design Categories</div>
              <div className="card-body">
                <div className="flex-column justify-content-center small text-warning mb-2">
                  {tagList.map((tag) => {
                    return (
                      <Link href={`/${tag}/`} className="bi-star-fill btn btn-outline-secondary m-1" style={{whiteSpace: 'nowrap'}} key={tag}>{tag}</Link>
                    )
                  })}
                </div>
              </div>
            </div>
            {/* Side widget*/}
            {/* <div className="card mb-4">
                <div className="card-header  bg-dark text-white">Side Widget</div>
                <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
            </div> */}
          </section>
        </div>{/* .row */}
      </div>{/* .container */}
    </Layout>
  );
}


export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database
    },
    revalidate: 1,
  };
};
