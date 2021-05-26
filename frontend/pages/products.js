import Products from '../components/Products';

export default function ProductsPage() {
  return <Products />;
}

// import { QueryRenderer, graphql } from 'react-relay';
// import RelayEnvironment from '../src/relay/RelayEnvironment';
//
// function Products() {
//   return (
//     <div>
//       <p>Products!</p>
//     </div>
//   );
// }
//
// const renderQuery = ({ error, props }) => {
//   if (error) {
//     return <div>{error.message}</div>;
//   }
//   if (props) {
//     console.log(props);
//     return <Products />;
//   }
//   return <div>Loading</div>;
// };
//
// export default function ProductsContainer() {
//   return (
//     <QueryRenderer
//       query={graphql`
//         query products_AllProductsQuery {
//           allProducts {
//             id
//             name
//             price
//             description
//             photo {
//               id
//               image {
//                 publicUrlTransformed
//               }
//             }
//           }
//         }
//       `}
//       render={renderQuery}
//       environment={RelayEnvironment}
//     />
//   );
// }
