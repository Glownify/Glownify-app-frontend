import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {S, getThemeColors} from '../../theme';
import {hp, wp} from '../../utils/responsive';

const Dropdown = ({
  options = [],
  value,
  onSelect,
  placeholder = 'Select an option',
  label,
  error,
  iconPosition = 'right',
  disabled = false,
  renderCustomLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = optionValue => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  const renderSelectedValue = () => {
    if (renderCustomLabel && selectedOption) {
      return renderCustomLabel(selectedOption);
    }

    return (
      <Text
        className={selectedOption ? 'text-neutral-900' : 'text-neutral-400'}
        style={{fontSize: S.fs.md}}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </Text>
    );
  };

  return (
    <View className="w-full" style={{gap: S.space.sm}}>
      {label ? (
        <Text
          className="text-neutral-700"
          style={{fontSize: S.fs.sm, fontWeight: '500'}}
        >
          {label}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.8}
        style={{
          minHeight: S.space['6xl'],
          paddingHorizontal: S.space.md,
          borderRadius: S.radius.full,
          gap: S.space.sm,
        }}
        className={[
          'flex-row items-center border bg-neutral-50',
          error ? 'border-error-500' : 'border-neutral-200',
          disabled ? 'opacity-50 bg-neutral-100' : 'active:bg-neutral-100',
          iconPosition === 'left' ? 'justify-start' : 'justify-between',
        ].join(' ')}
      >
        {iconPosition === 'left' ? (
          <View
            className="flex-1 flex-row items-center"
            style={{gap: S.space.sm}}
          >
            {renderSelectedValue()}
            <Icon name="chevron-down" size={S.icon.md} color={colors.neutral[500]} />
          </View>
        ) : (
          <>
            <View className="flex-1">{renderSelectedValue()}</View>
            <Icon name="chevron-down" size={S.icon.md} color={colors.neutral[500]} />
          </>
        )}
      </TouchableOpacity>

      {error ? (
        <Text
          className="text-error-600"
          style={{fontSize: S.fs.xs, fontWeight: '500'}}
        >
          {error}
        </Text>
      ) : null}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-overlay"
          style={{padding: S.space.lg}}
          onPress={() => setIsOpen(false)}
        >
          <Pressable
            onPress={() => {}}
            className="bg-surface border border-neutral-200 shadow-lg"
            style={{
              width: wp(92),
              maxHeight: hp(60),
              borderRadius: S.radius.xl,
              overflow: 'hidden',
            }}
          >
            <View
              className="flex-row items-center justify-between border-b border-neutral-200"
              style={{padding: S.space.md, gap: S.space.sm}}
            >
              <Text
                className="text-neutral-900"
                style={{fontSize: S.fs.lg, fontWeight: '600'}}
              >
                {label || 'Select an option'}
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)} activeOpacity={0.7}>
                <Icon name="x" size={S.icon.lg} color={colors.neutral[700]} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              ItemSeparatorComponent={() => (
                <View className="bg-neutral-100" style={{height: 1}} />
              )}
              renderItem={({item}) => {
                const isSelected = item.value === value;

                return (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    activeOpacity={0.8}
                    className={isSelected ? 'bg-primary-50' : 'bg-surface active:bg-neutral-50'}
                    style={{padding: S.space.md}}
                  >
                    <View
                      className="flex-row items-center justify-between"
                      style={{gap: S.space.sm}}
                    >
                      {renderCustomLabel ? (
                        renderCustomLabel(item)
                      ) : (
                        <Text
                          className={isSelected ? 'text-primary-600' : 'text-neutral-900'}
                          style={{
                            fontSize: S.fs.md,
                            fontWeight: isSelected ? '600' : '400',
                          }}
                        >
                          {item.label}
                        </Text>
                      )}

                      {isSelected ? (
                        <Icon
                          name="check"
                          size={S.icon.md}
                          color={colors.primary[600]}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;
