import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
    'person.fill': 'person',
    'person.3.fill': 'groups',
    'book.closed.fill': 'book',
    'graduationcap.fill': 'school',
    'plus.circle.fill': 'add',
    'trash.fill': 'delete',
    'exclamationmark.triangle.fill': 'warning',
    'person.2.slash.fill': 'person-off',
} as unknown as Partial<
    Record<
        import('expo-symbols').SymbolViewProps['name'],
        React.ComponentProps<typeof MaterialIcons>['name']
    >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
    name,
    size = 24,
    color,
    style,

}: {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: any;
    weight?: SymbolWeight;
}) {
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}