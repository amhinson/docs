import {Component, Host, h} from "@stencil/core";
import {searchStyle} from "./search-results-page.style";
import {pageContext} from "../../docs-ui/page/page.context";
import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
  clearRefinements,
  hits,
  pagination,
  refinementList,
  searchBox,
} from "instantsearch.js/es/widgets";

import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  UNINITIALIZED_SEARCH_INPUT_SELECTOR,
} from "../../constants/algolia";

const REFINEMENT_LIST_KEYS = {
  lib: "Libraries",
  cli: "CLI",
  start: "Getting Started",
  ui: "UI Components",
  guides: "Guides",
};

@Component({tag: "docs-search-results-page", shadow: false})
export class DocsSearchBar {
  componentDidRender() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");

    const client = algoliasearch(
      "38BAH9K7M4",
      "fc702841ed6664c00b2077da3c8e906f",
    );

    const search = instantsearch({
      indexName: "aws_amplify_new",
      searchClient: client,
      initialUiState: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        aws_amplify_new: {
          query,
        },
      },
    });

    search.addWidgets([
      searchBox({
        container: "#searchbox",
      }),
      refinementList({
        container: "#filter-list",
        attribute: "section",
        transformItems(items) {
          return items
            .sort((a, b) => (a.count > b.count ? -1 : 1))
            .map((item) => ({
              ...item,
              highlighted: REFINEMENT_LIST_KEYS[item.value] || item.highlighted,
            }));
        },
      }),
      hits({
        container: "#hits",
        templates: {
          item(hit) {
            const {lvl0, lvl1, lvl2, lvl3, lvl4, lvl5} = hit.hierarchy;
            return `<div>
          <div class="hit-name">
            ${lvl0}
            ${lvl1 ? `- ${lvl1}` : lvl2 ? `- ${lvl2}` : ""}
          </div>
          <div class="hit-description">
            ${lvl2 || ""}
            ${lvl2 && lvl3 ? "- " : ""}
            ${lvl3 ? lvl3 : ""}
            ${(lvl2 || lvl3) && lvl4 ? "- " : ""}
            ${lvl4 ? lvl4 : ""}
            ${(lvl2 || lvl3 || lvl4) && lvl5 ? "- " : ""}
            ${lvl5 ? lvl5 : ""}
          </div>
          <div class="hit-content">
            ${hit.content || ""}
          </div>
        </div>`;
          },
        },
      }),
      pagination({
        container: "#pagination",
      }),
    ]);

    search.start();
  }
  render() {
    return (
      <Host class={searchStyle}>
        <div class="ais-InstantSearch">
          <h1>Documentation Search</h1>

          <div class="left-panel">
            <h2>Filter</h2>
            <div id="filter-list"></div>
          </div>

          <div class="right-panel">
            <div id="searchbox" class="ais-SearchBox"></div>
            <div id="hits"></div>
            <div id="pagination"></div>
          </div>
        </div>
      </Host>
    );
  }
}

pageContext.injectProps(DocsSearchBar, ["pageData"]);
