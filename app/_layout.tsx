// import React from 'react';
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// // Pages where the tab bar should not appear
// const hiddenTabs = ['index', 'login', 'register'];

// // Main tab navigation pages
// const mainTabs = ['dashboard', 'about', 'note', 'profile'];

// export default function Layout() {
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName: string;

//           // Dynamically assign icons based on route names
//           switch (route.name) {
//             case 'dashboard':
//               iconName = 'home';
//               break;
//             case 'profile':
//               iconName = 'person';
//               break;
//             case 'note':
//               iconName = 'clipboard';
//               break;
//             case 'about':
//               iconName = 'information-circle';
//               break;
//             default:
//               iconName = 'help-circle'; // Default icon
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#007BFF',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//         tabBarStyle: hiddenTabs.includes(route.name) ? { display: 'none' } : { display: 'flex' },
//       })}
//     >
//       {/* Show tabs for main navigation */}
//       {mainTabs.map((tabName) => (
//         <Tabs.Screen
//           key={tabName}
//           name={tabName}
//           options={{
//             href: tabName === 'dashboard' ? '/' : `/${tabName}`, // Special handling for 'index'
//           }}
//         />
//       ))}

//       {/* Include hidden tabs, but without showing them in the tab bar */}
//       {hiddenTabs.map((tabName) => (
//         <Tabs.Screen
//           key={tabName}
//           name={tabName}
//           options={{
//             href: `/${tabName}`, // Explicitly define href for hidden tabs
//             tabBarButton: () => null, // Remove the tab button from the bar
//           }}
//         />
//       ))}
//     </Tabs>
//   );
// }
