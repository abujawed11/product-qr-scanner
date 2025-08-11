

import { checklistItems } from "@/app/(main)/warranty/claim-steps";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ChecklistStepProps = {
    checklistAnswers: { [key: string]: boolean };
    setChecklistAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    goBack: () => void;
    goNext: () => void;
};

export function ChecklistStep({
    checklistAnswers,
    setChecklistAnswers,
    goBack,
    goNext,
}: ChecklistStepProps) {
    const allAnswered = checklistItems.every(item => checklistAnswers[item.key] !== undefined);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#000" }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={{ flex: 1 }}>
                <Text style={{
                    color: "#FAD90E",
                    fontWeight: "bold",
                    fontSize: 22,
                    marginBottom: 18,
                    textAlign: "center",
                    marginTop: 24,
                }}>
                    Installation Checklist
                </Text>
                <ScrollView
                    style={{ flex: 1, paddingHorizontal: 24 }}
                    contentContainerStyle={{
                        paddingBottom: 40,
                        paddingTop: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {checklistItems.map(item => (
                        <View
                            key={item.key}
                            style={{ marginBottom: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                        >
                            <Text style={{ color: "#FFF", flex: 1, fontWeight: "bold", fontSize: 15 }}>
                                {item.question}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    padding: 8,
                                    borderRadius: 8,
                                    marginHorizontal: 3,
                                    backgroundColor: checklistAnswers[item.key] === true ? "#4ADE80" : "#374151"
                                }}
                                onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
                            >
                                <Text style={{ fontWeight: "bold", color: "#000" }}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    padding: 8,
                                    borderRadius: 8,
                                    marginHorizontal: 3,
                                    backgroundColor: checklistAnswers[item.key] === false ? "#F87171" : "#374151"
                                }}
                                onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
                            >
                                <Text style={{ fontWeight: "bold", color: "#000" }}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <SafeAreaView
                    edges={['bottom']}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 24,
                        paddingTop: 12,
                        paddingBottom: 18,
                        backgroundColor: "#000"
                    }}>
                    <TouchableOpacity onPress={goBack} style={{ padding: 12, borderRadius: 8, backgroundColor: "#374151" }}>
                        <Text style={{ color: "#FFF" }}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!allAnswered}
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            backgroundColor: allAnswered ? "#FAD90E" : "#6B7280"
                        }}
                        onPress={goNext}
                    >
                        <Text style={{ color: "#000", fontWeight: "bold" }}>Next</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
}

