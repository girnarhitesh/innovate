import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SITE_MAP_SECTIONS } from "../../utils/siteMapData";
import "./Sitemap.css";

const Sitemap = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="MainContainer marginTop SitemapPage" ref={sectionRef}>
      <div className="Container">
        <div className="paddingSide">
          <div className="CommonHeader">
            <div
              className="SectionTagLabelContainer"
              style={{ margin: "auto" }}
            >
              <div>
                <div className="flexVertically">
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutBrand.png"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p>Sitemap</p>
                </div>
              </div>
            </div>
            <h1 className="SitemapPage__title">Sitemap</h1>
            <p className="SitemapPage__intro">
              Use this sitemap to quickly find and open any page on the Innovate
              Securities website.
            </p>
          </div>

          <div className="SitemapPage__grid">
            {SITE_MAP_SECTIONS.map((section) => (
              <section
                key={section.id}
                className="SitemapPage__section"
                aria-labelledby={`sitemap-${section.id}`}
              >
                <h2 id={`sitemap-${section.id}`}>{section.title}</h2>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path}>
                        <span className="SitemapPage__linkTitle">{link.title}</span>
                        {link.description ? (
                          <span className="SitemapPage__linkDesc">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
