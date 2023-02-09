/* eslint-disable import/prefer-default-export */
import { graphql, useStaticQuery } from 'gatsby';

export type QueryResponse = {
  contentfulAbout: {
    aboutMe: {
      childMarkdownRemark: {
        rawMarkdownBody: string;
      };
    };
    profile: {
      title: string;
      image: {
        src: string;
      };
    };
    socialLinks: {
      id: string;
      url: string;
      name: string;
      fontAwesomeIcon: string;
    };
  };
};
export const useAboutMeQuery = () => {
  const { contentfulAbout } = useStaticQuery<QueryResponse>(graphql`
    query AboutMeQuery {
      contentfulAbout {
        aboutMe {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        profile {
          title
          image: resize(width: 650, quality: 100) {
            src
          }
        }
        socialLinks {
          id
          url
          name
          fontAwesomeIcon
        }
      }
    }
  `);

  return contentfulAbout;
};
