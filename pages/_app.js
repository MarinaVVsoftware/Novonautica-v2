/** next.js usa _app.js para inicializar las páginas.
 * Este documento lo que hace es hacer override y tomar el control
 * de la inicialización de las páginas, permitiendo hacer cosas como:
 *
 * - Layout peristente entre cambios de la página
 * - Mantenet el estado de la navegación de las páginas
 * - Manejo custom de errores usando "componentDidCatch"
 * - Inyectar data adicional a la página
 */
// --- Post bootstrap -----
import React from "react";
import App, { Container } from "next/app";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext from "../src/getPageContext";
import getSession, { getSessionLength } from "../helpers/getSession";
import jsCookie from "js-cookie";
import Router from "next/router";
import fetch from "isomorphic-fetch";

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  static async getInitialProps(config) {
    // How getInitialProps works: https://medium.com/@griko/exploring-undocumented-getinitialprops-properties-on-next-js-1265a6abc652
    const { Component, ctx } = config;
    let pageProps = {};
    let data = {};
    const cookies = {};
    const params = {
      mode: "cors",
      method: "GET",
      headers: {}
    };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (ctx.res && ctx.asPath != "/login" && getSessionLength(ctx.req) === 0) {
      ctx.res.writeHead(302, {
        Location: "/login"
      });
      ctx.res.end();
      return {};
    } else if (
      ctx.res &&
      ctx.asPath === "/login" &&
      getSessionLength(ctx.req) >= 1
    ) {
      ctx.res.writeHead(302, {
        Location: "/"
      });
      ctx.res.end();
      return {};
    }

    if (ctx.req) {
      if (getSessionLength(ctx.req) >= 1) {
        cookies.token = getSession(ctx.req).token;
        cookies.user = getSession(ctx.req).user;
      }
    } else {
      cookies.token = jsCookie.get("token");
      cookies.user = jsCookie.get("user");
    }

    params.headers.authorization = cookies.token;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    const initialReq = await fetch(
      `http://localhost:8080/api/users/${cookies.user}`,
      params
    );
    data = await initialReq.json();

    return {
      pageProps,
      asPath: ctx.asPath,
      data
    };
  }

  componentDidMount() {
    if (this.props.asPath != "/login" && !jsCookie.get("token")) {
      Router.push({
        pathname: "/login"
      });
      return {};
    } else if (this.props.asPath === "/login" && jsCookie.get("token")) {
      Router.push({
        pathname: "/"
      });
      return {};
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, data } = this.props;
    return (
      <Container>
        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider
          generateClassName={this.pageContext.generateClassName}
          sheetsRegistry={this.pageContext.sheetsRegistry}
          sheetsManager={this.pageContext.sheetsManager}>
          {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={this.pageContext.theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <Component
              pageContext={this.pageContext}
              {...pageProps}
              data={data}
            />
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}

export default MyApp;
