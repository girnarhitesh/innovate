import React from "react";

const isHttpUrl = (value) => /^https?:\/\//i.test(String(value || "").trim());
const isMailto = (value) => /^mailto:/i.test(String(value || "").trim());
const looksLikeUrl = (value) => {
  const v = String(value || "").trim();
  return isHttpUrl(v) || /^www\./i.test(v) || /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(v);
};

const CellValue = ({ value }) => {
  const text = String(value ?? "");
  if (!text) return null;

  if (isMailto(text) || (text.includes("@") && !text.includes(" ") && text.includes("."))) {
    const href = isMailto(text) ? text : `mailto:${text}`;
    const label = text.replace(/^mailto:/i, "");
    return (
      <a href={href} rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  if (looksLikeUrl(text) && !text.includes(" | ")) {
    const href = isHttpUrl(text) ? text : `https://${text}`;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {text.replace(/^https?:\/\//i, "")}
      </a>
    );
  }

  return text;
};

const Intro = ({ intro }) => {
  if (!intro) return null;
  return (
    <section className="MfDetailSection" aria-labelledby="structured-intro-heading">
      {intro.badge ? <p className="MfStructBadge">{intro.badge}</p> : null}
      <h2 id="structured-intro-heading" className="MfDiscMainTitle">
        {intro.heading}
      </h2>
      {intro.subtitle ? <p className="MfRegIntro__subtitle">{intro.subtitle}</p> : null}
      {intro.summaryLine ? <p className="MfRegIntro__summary">{intro.summaryLine}</p> : null}
      {intro.notice ? (
        <div className="MfDetailNote">
          <p>{intro.notice}</p>
        </div>
      ) : null}
    </section>
  );
};

const BlockHeading = ({ id, heading }) =>
  heading ? (
    <h2 id={id} className="MfDetailSection__title">
      {heading}
    </h2>
  ) : null;

const renderBlock = (block, index) => {
  const key = `${block.type}-${index}`;
  const headingId = `structured-block-${index}`;

  switch (block.type) {
    case "section":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          {block.intro ? <p className="MfRoBlock__intro">{block.intro}</p> : null}
          {block.bullets?.length ? (
            <ul className="MfDiscList">
              {block.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      );

    case "table":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <div className="MfDetailTableWrap">
            <table className="MfDetailTable">
              {block.heading ? <caption className="sr-only">{block.heading}</caption> : null}
              <thead>
                <tr>
                  {(block.columns || []).map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(block.rows || []).map((row, rowIndex) => (
                  <tr key={`${key}-row-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${key}-cell-${rowIndex}-${cellIndex}`}>
                        <CellValue value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    case "note":
      return (
        <div key={key} className="MfDetailNote MfStructNote">
          <p>{block.body}</p>
        </div>
      );

    case "alert":
      return (
        <div key={key} className="MfStructAlert" role="note">
          {block.heading ? <h3>{block.heading}</h3> : null}
          <p>{block.body}</p>
        </div>
      );

    case "rightsGrid":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <ol className="MfStructRightsGrid">
            {(block.items || []).map((item, i) => (
              <li key={item.title}>
                <span className="MfStructRightsGrid__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>
      );

    case "steps":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <ol className="MfIgrSteps MfStructSteps">
            {(block.items || []).map((item, i) => (
              <li key={item.title}>
                <span className="MfIgrSteps__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>
      );

    case "contactCard":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <div className="MfDetailGroCard">
            <div className="MfDetailGroCard__grid">
              {(block.fields || []).map((field) => (
                <p key={field.label}>
                  <span>{field.label}</span>
                  {field.href ? (
                    <a
                      href={field.href}
                      target={field.href.startsWith("http") ? "_blank" : undefined}
                      rel={field.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {field.value}
                    </a>
                  ) : (
                    <strong>{field.value}</strong>
                  )}
                </p>
              ))}
            </div>
          </div>
        </section>
      );

    case "links":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <ul className="MfStructLinks">
            {(block.items || []).map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      );

    case "linkCards":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <ul className="MfStructLinkCards">
            {(block.items || []).map((item) => (
              <li key={item.title}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <strong>{item.title}</strong>
                  {item.body ? <span>{item.body}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </section>
      );

    case "stats":
      return (
        <section key={key} className="MfDetailSection" aria-labelledby={headingId}>
          <BlockHeading id={headingId} heading={block.heading} />
          <ul className="MfStructStats">
            {(block.items || []).map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    default:
      return null;
  }
};

const StructuredComplianceContent = ({ page }) => {
  const { intro, blocks = [] } = page;
  return (
    <>
      <Intro intro={intro} />
      {blocks.map(renderBlock)}
    </>
  );
};

export default StructuredComplianceContent;
