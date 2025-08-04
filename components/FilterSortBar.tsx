// FilterSortBar.tsx
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FilterSortBarProps {
    search: string;
    setSearch: (val: string) => void;
    onFilter: () => void;
    sort: string;
    setSort: (val: string) => void;
}

const ACCENT = '#FAD90E';

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
    search,
    setSearch,
    onFilter,
    sort,
    setSort,
}) => (
    <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
        <TextInput
            style={{
                backgroundColor: '#fffde6',
                color: '#212121',
                borderRadius: 8,
                paddingHorizontal: 8,
                flex: 1,
                marginRight: 8,
                height: 36,
            }}
            placeholder="Search project or client"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={onFilter}
            returnKeyType="search"
        />
        <TouchableOpacity
            onPress={onFilter}
            style={{
                marginHorizontal: 3,
                backgroundColor: ACCENT,
                borderRadius: 8,
                padding: 8,
                height: 36,
                justifyContent: 'center',
            }}
        >
            <Text style={{ color: '#333', fontWeight: 'bold' }}>Go</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                marginLeft: 4,
                paddingHorizontal: 8,
                backgroundColor: '#fffde6',
                borderRadius: 8,
                height: 36,
                justifyContent: 'center',
            }}
            //   onPress={() => setSort(s => (s === 'desc' ? 'asc' : 'desc'))}
            onPress={() => setSort(sort === 'desc' ? 'asc' : 'desc')}
        >
            <Text style={{ color: '#212121', fontSize: 13 }}>
                {sort === 'desc' ? '⬇️ Newest' : '⬆️ Oldest'}
            </Text>
        </TouchableOpacity>
    </View>
);
