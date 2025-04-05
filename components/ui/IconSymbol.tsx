// components/ui/IconSymbol.tsx
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle, View } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <View style={[styles.iconContainer, { borderRadius: size * 0.5 }]}>
      <SymbolView
        weight={weight}
        tintColor={color}
        resizeMode="center"
        name={name}
        style={[
          styles.icon,
          {
            width: size,
            height: size,
          },
          style,
        ]}
      />
    </View>
  );
}

const styles = {
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 4,
  },
};