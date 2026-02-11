import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Dropdown = ({
  options,
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
  
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  const renderSelectedValue = () => {
    if (renderCustomLabel && selectedOption) {
      return renderCustomLabel(selectedOption);
    }
    return (
      <Text className="text-base text-neutral-900">
        {selectedOption ? selectedOption.label : placeholder}
      </Text>
    );
  };

  return (
    <View className="w-full">
      {/* Label */}
      {label && (
        <Text className="text-sm font-medium text-neutral-700 mb-2">
          {label}
        </Text>
      )}

      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`
          flex-row items-center px-md py-4 border bg-gray-100 rounded-input
          ${error ? 'border-error' : 'border-neutral-200'}
          ${disabled ? 'opacity-50 bg-neutral-50' : 'active:bg-neutral-50'}
          ${iconPosition === 'left' ? 'justify-start' : 'justify-between'}
        `}
      >
        {/* Left Icon (for country code use case) */}
        {iconPosition === 'left' && (
          <View className="flex-row items-center flex-1">
            {renderSelectedValue()}
            <Icon 
              name="chevron-down" 
              size={20} 
              color="#6b7280" 
              style={{ marginLeft: 8 }}
            />
          </View>
        )}

        {/* Standard Layout (space-between) */}
        {iconPosition === 'right' && (
          <>
            <View className="flex-1">
              {renderSelectedValue()}
            </View>
            <Icon 
              name="chevron-down" 
              size={20} 
              color="#6b7280" 
            />
          </>
        )}
      </TouchableOpacity>

      {/* Error Message */}
      {error && (
        <Text className="text-sm text-error mt-1">
          {error}
        </Text>
      )}

      {/* Modal Dropdown List */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setIsOpen(false)}
        >
          <View className="w-11/12 max-h-96 bg-neutral-white rounded-card shadow-lg">
            {/* Header */}
            <View className="flex-row items-center justify-between px-md py-md border-b border-neutral-200">
              <Text className="text-lg font-semibold text-neutral-900">
                {label || 'Select an option'}
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Icon name="x" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value)}
                  className={`
                    px-md py-3.5 border-neutral-100
                    ${item.value === value ? 'bg-primary-50' : 'active:bg-neutral-50'}
                  `}
                >
                  <View className="flex-row items-center justify-between">
                    {renderCustomLabel ? (
                      renderCustomLabel(item)
                    ) : (
                      <Text 
                        className={`text-base ${
                          item.value === value 
                            ? 'text-primary font-semibold' 
                            : 'text-neutral-900'
                        }`}
                      >
                        {item.label}
                      </Text>
                    )}
                    
                    {item.value === value && (
                      <Icon name="check" size={20} color="#f43f5e" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;