
import { claimSteps } from "@/app/(main)/warranty/claim-steps";
import { ChecklistStep } from "@/components/ChecklistStep";
import { MediaStep } from "@/components/MediaStep";
import { ReviewStep } from "@/components/ReviewStep";
import { UploadModal } from "@/components/UploadModal"; // <-- this!
import api from "@/utils/api";
import { getLocationWithPermission } from "@/utils/locationUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // --- IMPORTANT
import { AxiosError, AxiosProgressEvent } from "axios";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";


type StepMedia = {
    image?: string;
    video?: string;
};

export default function ClaimMediaWizard() {
    const params = useLocalSearchParams<any>();
    //   const [media, setMedia] = useState<{ [k: string]: any }>({});
    const [stepIdx, setStepIdx] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [checklistAnswers, setChecklistAnswers] = useState<{ [key: string]: boolean }>({});
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locError, setLocError] = useState<string | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

    const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});

    // For progress/modal
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Step indices
    const checklistStepIdx = claimSteps.length;
    const reviewStepIdx = claimSteps.length + 1;
    const lastStepIdx = reviewStepIdx;

    // QueryClient for cache invalidation
    const queryClient = useQueryClient();

    // ---- Mutation for claim submission ----
    const submitClaimMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post("/warranty-claims/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 120_000,
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        setUploadProgress(100 * progressEvent.loaded / progressEvent.total);
                    }
                }
            });
            return response;
        },
        onSuccess: (response, variables, context) => {
            setIsSubmitting(false);
            setUploadProgress(0);
            // 🔥 Invalidate queries so dashboard and other places auto-refresh!
            queryClient.invalidateQueries({ queryKey: ["warrantySummary"] });
            queryClient.invalidateQueries({ queryKey: ["warrantyDashboardCounts"] });
            queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] }); // adjust keys as your listing components use
            queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });
            queryClient.invalidateQueries({ queryKey: ["myWarrantyClaims"] });
            queryClient.invalidateQueries({ queryKey: ["myWarrantyCards"] });
            queryClient.invalidateQueries({ queryKey: ["kitDetails"] });
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications', 'unread_count'] }); // 👈 Add this
            resetWizard();
            Alert.alert("Submitted!", "Your warranty claim has been submitted.");
            router.replace("/(main)/dashboard");
        },
        onError: (error: AxiosError) => {
            setIsSubmitting(false);
            setUploadProgress(0);
            if (error.response && error.response.data && typeof error.response.data === "object") {
                const data = error.response.data as any;
                Alert.alert("Submission Error", data.detail || JSON.stringify(data));
            } else {
                Alert.alert(
                    "Submission Error",
                    "Could not submit your claim. Please check your network or try again."
                );
            }
        }
    });

    function resetWizard() {
        setStepIdx(0);
        setMedia({});
        setAccepted(false);
        setChecklistAnswers({});
        setLocation(null);
        setLocError(null);
        setLocationLoading(false);
        setHasRequestedLocation(false);
    }

    function handleCancel() {
        resetWizard();
        router.replace("/(main)/dashboard");
    }

    useEffect(() => {
        resetWizard();
        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     const backAction = () => {
    //         if (stepIdx === 0) {
    //             Alert.alert(
    //                 "Cancel Warranty Claim?",
    //                 "Are you sure you want to cancel the warranty claim and go back to dashboard?",
    //                 [
    //                     { text: "Cancel", style: "cancel" },
    //                     {
    //                         text: "Leave",
    //                         style: "destructive",
    //                         onPress: handleCancel,
    //                     },
    //                 ]
    //             );
    //             return true;
    //         } else {
    //             setStepIdx(i => i - 1);
    //             return true;
    //         }
    //     };
    //     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    //     return () => backHandler.remove();
    // }, [stepIdx]);

    // inside your component:
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                if (stepIdx === 0) {
                    Alert.alert(
                        "Cancel Warranty Claim?",
                        "Are you sure you want to cancel the warranty claim and go back to dashboard?",
                        [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Leave",
                                style: "destructive",
                                onPress: handleCancel,
                            },
                        ]
                    );
                    return true;
                } else {
                    setStepIdx(i => i - 1);
                    return true;
                }
            };
            const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

            return () => {
                backHandler.remove();
            };
        }, [stepIdx])
    );

    useEffect(() => {
        if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
            setHasRequestedLocation(true);
            grantLocation();
        } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
            setHasRequestedLocation(false);
            setLocation(null);
            setLocError(null);
            setLocationLoading(false);
        }
    }, [stepIdx]);

    function grantLocation() {
        setLocationLoading(true);
        setLocError(null);
        getLocationWithPermission()
            .then(res => {
                if ("error" in res) {
                    setLocError(res.error);
                    setLocation(null);
                } else {
                    setLocation(res);
                    setLocError(null);
                }
            })
            .finally(() => setLocationLoading(false));
    }

    function goBack() {
        if (stepIdx === 0) {
            Alert.alert(
                "Cancel Warranty Claim?",
                "Are you sure you want to cancel the warranty claim and go back to dashboard?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Leave",
                        style: "destructive",
                        onPress: handleCancel,
                    },
                ]
            );
        } else {
            setStepIdx(i => i - 1);
        }
    }

    function goNext() {
        if (stepIdx < checklistStepIdx) {
            const step = claimSteps[stepIdx];
            if (!media[step.key]?.image && !media[step.key]?.video) {
                Alert.alert("Please upload at least an image or a video before proceeding.");
                return;
            }
        }
        setStepIdx(i => i + 1);
    }

    // ----- MUTATION-BASED SUBMIT -----
    async function handleSubmit() {
        const formData = new FormData();
        for (const key of [
            "clientId", "companyName", "clientName", "phone", "email", "orderId", "kitId", "kitNo", "projectId", "purchaseDate"
        ]) {
            formData.append(key, params[key] || "");
        }
        formData.append("accepted_statement", accepted ? "true" : "false");
        if (location) {
            formData.append("latitude", String(location.latitude));
            formData.append("longitude", String(location.longitude));
        }
        formData.append("checklist", JSON.stringify(checklistAnswers));

        Object.entries(media).forEach(([stepKey, mediaObj]) => {
            (["image", "video"] as const).forEach((mediaType) => {
                const uri = mediaObj[mediaType];
                if (typeof uri !== "string" || !uri) return;
                const fileExt = uri.split(".").pop() || (mediaType === "image" ? "jpg" : "mp4");
                const mime = mediaType === "image" ? "image/jpeg" : "video/mp4";
                formData.append("files", {
                    uri,
                    name: `step_${stepKey}_${mediaType}.${fileExt}`,
                    type: mime,
                } as any);
                formData.append("step_key", stepKey);
                formData.append("media_type", mediaType);
            });
        });

        setIsSubmitting(true);
        setUploadProgress(0);

        submitClaimMutation.mutate(formData);
    }

    // --------- UI --------------
    return (
        <>
            {/* PROGRESS MODAL */}
            <UploadModal visible={isSubmitting} progress={uploadProgress} />

            {/* STEPS */}
            {stepIdx < checklistStepIdx && (
                <MediaStep
                    step={claimSteps[stepIdx]}
                    media={media}
                    setMedia={setMedia}
                    goBack={goBack}
                    goNext={goNext}
                />
            )}
            {stepIdx === checklistStepIdx && (
                <ChecklistStep
                    checklistAnswers={checklistAnswers}
                    setChecklistAnswers={setChecklistAnswers}
                    goBack={goBack}
                    goNext={() => setStepIdx(i => i + 1)}
                />
            )}
            {stepIdx === reviewStepIdx && (
                <ReviewStep
                    media={media}
                    checklistAnswers={checklistAnswers}
                    accepted={accepted}
                    setAccepted={setAccepted}
                    location={location}
                    locationLoading={locationLoading}
                    locError={locError}
                    onGrantLocation={grantLocation}
                    onSubmit={() => {
                        if (!accepted) {
                            Alert.alert("Acceptance Required", "Please confirm all details are correct to submit.");
                            return;
                        }
                        if (!location) {
                            Alert.alert("Location Required", "Grant location permission to proceed.");
                            return;
                        }
                        handleSubmit();
                    }}
                />
            )}
        </>
    );
}
