import Link from "next/link";

export default function Navigation({  }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
            <Link href={`/`} className="navbar-brand">Techvenience</Link>
            <p className="text-secondary me-auto mb-2 mb-lg-0 ms-lg-4"><small>Technology × Convenience / デザイン関連のツールなどがもたらす便利さをお伝えします！！</small></p>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" href={`/`}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" href={`/about/`}>
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" href={`/blog/`}>
                        Blog
                      </Link>
                    </li>
                </ul>
            </div> */}
            
        </div>
    </nav>
  );
}