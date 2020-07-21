import {Component, Host, h, Build, Element, Prop} from "@stencil/core";
import {searchStyle} from "./search-bar.style";
import {transformData} from "../../utils/transform-search-data";
import {pageContext} from "../../docs-ui/page/page.context";
import {Page} from "../../api";
import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  UNINITIALIZED_SEARCH_INPUT_SELECTOR,
} from "../../constants/algolia";

@Component({tag: "docs-search-bar", shadow: false})
export class DocsSearchBar {
  /*** the global filter state */
  @Prop() readonly pageData?: Page;

  @Element() element: HTMLElement;

  initDocSearch(filter?: string) {
    if (Build.isBrowser) {
      // @ts-ignore
      docsearch({
        container: "#docsearch",
        indexName: "aws_amplify_new",
        appId: "38BAH9K7M4",
        apiKey: "fc702841ed6664c00b2077da3c8e906f",
        searchParameters: {
          // distinct: 1,
          hitsPerPage: 25,
          optionalFilters: filter ? [`section:${filter}`] : undefined,
        },
        transformItems: transformData,
      });
      // docsearch({
      //   apiKey: ALGOLIA_API_KEY,
      //   indexName: ALGOLIA_INDEX_NAME,
      //   inputSelector: UNINITIALIZED_SEARCH_INPUT_SELECTOR,
      //   debug: false,
      //   transformData,
      //   algoliaOptions: {
      //     hitsPerPage: 10,
      //   },
      // });
    }
  }

  // componentDidLoad() {
  //   this.initDocSearch();
  // }

  componentDidRender() {
    const routes = this.pageData ? this.pageData.route.split("/") : [];
    if (routes.length > 1) {
      const section = routes[1];
      this.initDocSearch(section);
    }

  }

  render() {
    return (
      <Host class={searchStyle}>
        <div>
          <div>
            <div id="docsearch"></div>
            <input
              id="amplify-docs-search-input"
              class="three-dee-effect"
              type="search"
              placeholder="Search"
            />
            <img src="/assets/search.svg" alt="search" />
          </div>
        </div>
      </Host>
    );
  }
}

pageContext.injectProps(DocsSearchBar, ["pageData"]);