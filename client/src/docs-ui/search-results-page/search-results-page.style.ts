import {css} from "emotion";

export const searchStyle = css`
  .ais-SearchBox {
    margin: 1em 0;
  }

  .ais-Pagination {
    margin-top: 1em;
  }

  .left-panel {
    float: left;
    width: 250px;
  }

  .right-panel {
    margin-left: 260px;
  }

  .ais-InstantSearch {
    max-width: 960px;
    overflow: hidden;
    margin: 0 auto;
    h1 {
      margin-top: 20px;
      text-align: center;
    }
  }

  .ais-Hits-item {
    width: 97%;
    padding: 0.5rem 1rem;
  }

  .hit-description {
    color: #888;
    font-size: 12px;
    margin-bottom: 0.1em;
  }
  .hit-content {
    color: #888;
    font-size: 14px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
