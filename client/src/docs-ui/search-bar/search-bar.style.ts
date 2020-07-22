import {MQLaptop} from "../../amplify-ui/styles/media";
import {css} from "emotion";

// we use !important to override webkit's imposed border-radius
export const searchStyle = css`
  width: 100%;
  ${MQLaptop} {
    width: initial;
  }
  > div {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    #docsearch {
      width: 100%;
    }

    .DocSearch-SearchButton {
      width: 100%;
    }

    .DocSearch-SearchButton-Placeholder {
      flex: 1;
      text-align: left;
    }

    .DocSearch-SearchButton-Key {
      height: 16px;
      width: 17px;
      font-size: 12px;
    }

    .DocSearch-SearchButton-Placeholder,
    .DocSearch-SearchButton-Key {
      color: var(--docsearch-text-color) !important;
    }
  }
`;
