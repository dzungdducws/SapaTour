// import React, { useEffect } from 'react';
// import { Text, View, Button, TouchableOpacity } from 'react-native';

// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types';

// // Screen1
// type Screen1Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'OneScreen'>;
// };
// export const Screen1: React.FC<Screen1Props> = ({ navigation }) => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Screen 1</Text>

//     <Button
//       onPress={() => {
//         navigation.navigate('Home');
//       }}
//       title="Go to Home"
//     />
//     <Button
//       onPress={() => {
//         navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
//       }}
//       title="Reset to Home"
//     />
//     <Button
//       onPress={() => {
//         navigation.navigate('TwoScreen');
//       }}
//       title="Go to 2"
//     />
//   </View>
// );

// // Screen2
// type Screen2Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'TwoScreen'>;
// };
// export const Screen2: React.FC<Screen2Props> = ({ navigation }) => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Screen 2</Text>
//     <Button
//       onPress={() => {
//         navigation.navigate('ThreeScreen');
//       }}
//       title="Go to 3"
//     />
//   </View>
// );

// // Screen3
// type Screen3Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'ThreeScreen'>;
// };
// export const Screen3: React.FC<Screen3Props> = ({ navigation }) => {
//   const [routesLength, setRoutesLength] = React.useState(0);
//   const [currentRouteIndex, setCurrentRouteIndex] = React.useState(0);
//   const [routesInfo, setRoutesInfo] = React.useState<
//     Array<{ name: string; key: string }>
//   >([]);

//   React.useEffect(() => {
//     const updateNavigationState = () => {
//       const state = navigation.getState();
//       setRoutesLength(state.routes.length);
//       setCurrentRouteIndex(state.index);
//       setRoutesInfo(
//         state.routes.map(route => ({
//           name: route.name,
//           key: route.key,
//         })),
//       );
//     };

//     updateNavigationState();

//     const unsubscribe = navigation.addListener('state', updateNavigationState);

//     return unsubscribe;
//   }, [navigation]);

//   const resetNavigation = (options: {
//     targetScreen: string;
//     keepPrevious?: boolean;
//     resetCompletely?: boolean;
//   }) => {
//     const currentRoutes = navigation.getState().routes;

//     let newRoutes = currentRoutes.map(currentRoute => {
//       return { name: currentRoute.name };
//     });
//     console.log(newRoutes);
//     // if (options.resetCompletely) {
//     //   newRoutes = [
//     //     { name: 'OneScreen' },
//     //     { name: 'TwoScreen' },
//     //     { name: options.targetScreen },
//     //   ];
//     // } else if (options.keepPrevious) {
//     //   newRoutes.push({ name: options.targetScreen });
//     // } else {
//     //   newRoutes.slice(0, -1);
//     //   newRoutes.push({ name: options.targetScreen });
//     // }
//     // console.log(newRoutes);

//     // navigation.reset({
//     //   index: newRoutes.length - 1,
//     //   routes: newRoutes,
//     // });
//   };

//   return (
//     <View>
//       <Text>Navigation Controller</Text>

//       <View>
//         <Text>
//           Current Screen:{' '}
//           {navigation.getState().routes[currentRouteIndex]?.name}
//         </Text>
//         <Text>Routes Length: {routesLength}</Text>
//         <Text>Current Index: {currentRouteIndex}</Text>
//       </View>

//       <View>
//         <TouchableOpacity
//           onPress={() =>
//             resetNavigation({
//               targetScreen: 'FourScreen',
//               keepPrevious: true,
//             })
//           }
//         >
//           <Text>Add FourScreen</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() =>
//             resetNavigation({
//               targetScreen: 'FourScreen',
//               resetCompletely: true,
//             })
//           }
//         >
//           <Text>Reset to Four (full reset)</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('TwoScreen')}>
//           <Text>Go to TwoScreen</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // Screen4
// type Screen4Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'FourScreen'>;
// };
// export const Screen4: React.FC<Screen4Props> = ({ navigation }) => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Screen 4</Text>
//   </View>
// );
