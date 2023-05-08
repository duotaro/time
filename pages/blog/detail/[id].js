import { Fragment } from "react";
import Head from "next/head";
import { getDatabase, getPage, getBlocks } from "../../../lib/notion";
import Link from "next/link";
import { databaseId } from "../../index.js";
import styles from "../../post.module.css";
import Layout from "../../../components/layout"

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    if (!text) {
      return null;
    }
    
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];


  switch (type) {
    case "paragraph":
      if(!value.rich_text || value.rich_text.length == 0){
        return (
          <p></p>
        )
      };
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className="display-3">
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="display-4">
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="display-6">
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return <ul>{value.children.map((child) => renderBlock(child))}</ul>;
    }
    case "numbered_list": {
      return <ol>{value.children.map((child) => renderBlock(child))}</ol>;
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{value.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} style={{width : '100%'}}/>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      let val = ''
      value.rich_text.map(t => {
        val += t.plain_text
      })
      return <blockquote key={id}>{val}</blockquote>;
    case "code":
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      );
    case "mention":
      return (
        <a href={value.url} target="_brank" className={styles.bookmark}>
          {value.plain_text}
        </a>
      );
    case "table": {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child, i) => {
              const RowElement =
                value.has_column_header && i == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className={styles.row}>
          {block.children.map((block) => renderBlock(block))}
        </div>
      );
    }
    case "column": {
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    case "embed": {
      const url = value.url;
      return (
        <a href={url} target="_brank" className={styles.bookmark}>
          {url}
        </a>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function Post({ page, blocks, tagList }) {
  if (!page || !blocks) {
    return <div />;
  }
  let pageTitle = ""
  for(const t of page.properties.Name.title){
    pageTitle += t.plain_text
  }

  const createtDate = new Date(page.created_time).toLocaleString(
    "ja",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
  const lastEditDate = new Date(page.last_edited_time).toLocaleString(
    "ja",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  // 
  //console.log(blocks)
  

  const adIndex = Math.ceil(blocks.length/2)
  return (
    <Layout>
      <Head>
        <title>[時間管理]{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    {/* Post content*/}
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{pageTitle}</h1>
                            <div className="text-muted fst-italic mb-2">
                              <strong>作成日</strong> {createtDate} / 更新日 {lastEditDate}
                            </div>
                            {page.properties.Tags.multi_select.map((tag) => {
                              return (
                                <Link href={`/blog/?tag=${tag.name}`} className="bi-star-fill btn btn-outline-secondary m-1"  key={tag.id}>{tag.name}</Link>
                              )
                            })}
                        </header>
                        <p>広告</p>
                        {/* <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure> */}
                        {/* Post content*/}
                        {blocks.map((block, index) => {
                          
                          if(adIndex == index){
                            return (
                              <Fragment key={block.id}>
                                {/* 広告 */}
                                {renderBlock(block)}
                              </Fragment>
                            )
                          } else {
                            return (
                              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                            )
                          }
                          
                          })}
                    </article>
                    <Link href="/" className={styles.back}>← Go home</Link>
                </div>
                {/* Side widgets*/}
                <div className="col-lg-4">
                    {/* Search widget*/}
                    {/* <div className="card mb-4">
                        <div className="card-header bg-dark text-white">Search</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                            </div>
                        </div>
                    </div> */}
                    {/* Categories widget*/}
                    <div className="card mb-4">
                        <div className="card-header  bg-dark text-white">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="container">
                                    <div className="row">
                                      {tagList.map((tag) => {
                                        return (
                                          <div className="col-3" style={{width:'fit-content'}}><Link href={`/${tag}/`} className="col bi-star-fill btn btn-outline-secondary m-1"  key={tag}>{tag}</Link></div>
                                        )
                                      })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Side widget*/}
                    {/* <div className="card mb-4">
                        <div className="card-header  bg-dark text-white">Side Widget</div>
                        <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div> */}
                </div>
            </div>
        </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const database = await getDatabase(databaseId);
  let tagList = []
  
  for(const item of database) {
    if(!item){
      continue
    }
    item.properties.Tags.multi_select.map((tag) => {
      if(tagList.indexOf(tag.name) < 0){
        tagList.push(tag.name)
      }
    })
  }

  const page = await getPage(id);
  const blocks = await getBlocks(id);

  return {
    props: {
      page,
      blocks,
      tagList
    },
    revalidate: 1,
  };
};
