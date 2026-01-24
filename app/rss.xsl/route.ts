const xslContent = `<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8"/>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            line-height: 1.6;
            max-width: 720px;
            margin: 0 auto;
            padding: 2rem 1rem;
            background: #fafafa;
            color: #333;
          }
          header {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
          }
          .badge {
            display: inline-block;
            background: #f97316;
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          h1 {
            font-size: 1.75rem;
            font-weight: 700;
            margin: 0.5rem 0;
            color: #111;
          }
          .description {
            color: #666;
            margin-top: 0.5rem;
          }
          .subscribe-hint {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-top: 1rem;
            font-size: 0.875rem;
            color: #666;
          }
          .subscribe-hint code {
            background: #f5f5f5;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.8125rem;
            word-break: break-all;
          }
          .post-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .post-item {
            border-bottom: 1px solid #e5e5e5;
            padding: 1.25rem 0;
          }
          .post-item:last-child {
            border-bottom: none;
          }
          .post-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
          }
          .post-title a {
            color: #111;
            text-decoration: none;
          }
          .post-title a:hover {
            color: #f97316;
          }
          .post-meta {
            font-size: 0.8125rem;
            color: #888;
            margin-bottom: 0.5rem;
          }
          .post-description {
            color: #555;
            font-size: 0.9375rem;
            margin: 0;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background: #111;
              color: #e5e5e5;
            }
            header {
              border-bottom-color: #333;
            }
            h1 {
              color: #fff;
            }
            .description {
              color: #999;
            }
            .subscribe-hint {
              background: #1a1a1a;
              border-color: #333;
              color: #999;
            }
            .subscribe-hint code {
              background: #222;
            }
            .post-item {
              border-bottom-color: #333;
            }
            .post-title a {
              color: #fff;
            }
            .post-description {
              color: #aaa;
            }
          }
        </style>
      </head>
      <body>
        <header>
          <span class="badge">RSS Feed</span>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
          <div class="subscribe-hint">
            <strong>如何订阅？</strong> 复制当前页面 URL 到你喜欢的 RSS 阅读器中即可订阅。
            <br/>
            <code><xsl:value-of select="/rss/channel/link"/>/rss.xml</code>
          </div>
        </header>
        <main>
          <ul class="post-list">
            <xsl:for-each select="/rss/channel/item">
              <li class="post-item">
                <h2 class="post-title">
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p class="post-meta">
                  <xsl:value-of select="substring(pubDate, 1, 16)"/>
                </p>
                <p class="post-description">
                  <xsl:value-of select="description"/>
                </p>
              </li>
            </xsl:for-each>
          </ul>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

export async function GET() {
  return new Response(xslContent, {
    headers: {
      'Content-Type': 'application/xslt+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  });
}
