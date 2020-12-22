import { PAGE, POST } from '@/assets/scripts/pageTypes'
import { getPostTitle } from '@/assets/scripts/helpers'
import homePath from '@/mixins/home-path'

export default {
  mixins: [homePath],
  data() {
    return {
      pageData: {},
      postsPage: {},
    }
  },
  computed: {
    breadcrumbs() {
      const pageType = this.$route.meta.type
      let parents = this.pageData.parents_pages || []
      let rootPage = {}

      if (pageType === POST) rootPage = this.postsPage

      if (pageType !== PAGE) {
        if (rootPage.parents_pages) parents = [...rootPage.parents_pages, rootPage]
      }

      const [currentNavItem] =
        pageType !== PAGE
          ? []
          : this.$store.getters['pages/navList'].filter(({ id }) => id === this.$route.meta.id)

      const list = parents.map(page => {
        const [navItem] = this.$store.getters['pages/navList'].filter(
          ({ id }) => id === page.nav_item || id === page.nav_item.id
        )

        return {
          page,
          navItem,
          type: pageType,
        }
      })

      const currentPage = {
        isCurrent: true,
        page: this.pageData,
        navItem: currentNavItem || { ...this.pageData },
        type: pageType,
      }

      return [...list, currentPage]
    },
    pageBreadcrumbs() {
      return this.breadcrumbs.map(({ page, navItem, isCurrent, type }) => {
        const url = page.alias === null ? this.homePath : page.alias
        let text
        if (type === PAGE) text = navItem?.[`title_${this.LANGUAGE}`]
        if (type === POST) text = getPostTitle(navItem?.[`title_${this.LANGUAGE}`])

        return {
          text,
          url: isCurrent ? false : url,
        }
      })
    },
  },
  jsonld() {
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: process.env.BASE_NAME,
      url: `${process.env.BASE_URL}/`,
      logo: {
        '@context': 'http://schema.org',
        '@type': 'ImageObject',
        url: `${process.env.BASE_URL}/logo.jpg`,
        width: 512,
        height: 512,
      },
      sameAs: ['https://www.instagram.com/', 'https://www.facebook.com/'],
      diversityPolicy: `${process.env.BASE_URL}/`,
      ethicsPolicy: `${process.env.BASE_URL}/`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+380999999999',
          contactType: 'sales',
          areaServed: 'UA',
        },
      ],
    }

    const breadcrumbsItems =
      this.breadcrumbs?.map(({ page, navItem }, i) => {
        const pageAlias = !page.alias ? '' : page.alias

        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'WebPage',
            '@id': `${process.env.BASE_URL}${this.homePath}${pageAlias}`,
            name: navItem[`title_${this.LANGUAGE}`],
          },
        }
      }) || []

    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbsItems,
    }

    const post = this.$route.meta.type === POST ? {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      description: `${this.pageData[`description_${this.LANGUAGE}`]}`,
      image: [
        {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          url: `${process.env.BASE_URL_BACK}${this.pageData.img?.url}`,
          height: this.pageData.img?.height,
          width: this.pageData.img?.width,
        },
      ],
      mainEntityOfPage: `${process.env.BASE_URL}${this.homePath}${this.pageData.parent_page?.alias}`,
      url: `${process.env.BASE_URL}${this.homePath}${this.pageData.alias}`,
      inLanguage: this.LANGUAGE,
      author: [
        {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          name: process.env.BASE_NAME,
        },
      ],
      dateModified: this.pageData.updated_at,
      datePublished: this.pageData.published_at,
      headline: getPostTitle(this.pageData[`title_${this.LANGUAGE}`]),
      publisher: {
        '@type': 'Organization',
        name: process.env.BASE_NAME,
        url: `${process.env.BASE_URL}/`,
        logo: {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          url: `${process.env.BASE_URL}/logo.jpg`,
          width: 512,
          height: 512,
        },
      },
      copyrightHolder: {
        '@type': 'Organization',
        name: process.env.BASE_NAME,
        url: `${process.env.BASE_URL}/`,
        logo: {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          url: `${process.env.BASE_URL}/logo.jpg`,
          width: 512,
          height: 512,
        },
      },
      sourceOrganization: {
        '@type': 'Organization',
        name: process.env.BASE_NAME,
        url: `${process.env.BASE_URL}/`,
        logo: {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          url: `${process.env.BASE_URL}/logo.jpg`,
          width: 512,
          height: 512,
        },
      },
      copyrightYear: new Date(this.pageData.published_at).getFullYear(),
    } : null

    const objects = [organization, breadcrumbs, post]

    return objects.filter(item => item)
  },
}
