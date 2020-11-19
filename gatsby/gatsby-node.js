import { graphql } from 'gatsby';
import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a templatefor this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  //   console.log(`Turning the Toppings into Paged!!!`);
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all the Toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Create Page for that Toppings

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });

  // 4. Pass topping data to pizza.js
}

async function fetchWinesAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of wines
  const res = await fetch('https://sampleapis.com/wines/api/whites');
  const wines = await res.json();
  // 2. loop over each one
  for (const wine of wines) {
    // create a node for each wine
    const nodeMeta = {
      id: createNodeId(`wine-${wine.wine}`),
      parent: null,
      children: [],
      internal: {
        type: 'Wine',
        mediaType: 'application/json',
        contentDigest: createContentDigest(wine),
      },
    };
    // 3. Create a node for that wine
    actions.createNode({
      ...wine,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all Slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. Turn each slicemaster into their own page (TODO)

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages there are based on how many slicemasters there are,
  // and how many per pages
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of wines and source them into our gatsby API!
  await Promise.all([fetchWinesAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    await turnPizzasIntoPages(params),
    await turnToppingsIntoPages(params),
    await turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
