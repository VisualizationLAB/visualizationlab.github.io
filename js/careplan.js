/**
 * AI Care Planner - Care Plan Generator
 * This script processes patient assessment data and generates personalized wound care plans
 * based on evidence-based practices extracted from wound care documents.
 */

class CarePlanGenerator {
    constructor(knowledgeBase) {
        this.knowledgeBase = knowledgeBase;
    }
    
    /**
     * Generate a care plan based on patient and wound assessment data
     * @param {Object} patientData - The patient assessment data
     * @return {Object} - The generated care plan
     */
    generateCarePlan(patientData) {
        // Validate required fields
        if (!this.validateData(patientData)) {
            return {
                success: false,
                message: "Insufficient data. Please provide at least the wound type, location, and patient age."
            };
        }
        
        try {
            // Build care plan components
            const primaryRecommendations = this.getPrimaryRecommendations(patientData);
            const additionalRecommendations = this.getAdditionalRecommendations(patientData);
            const followUp = this.getFollowUpRecommendations(patientData);
            const warnings = this.getWarnings(patientData);
            
            // Assemble complete care plan
            const carePlan = {
                success: true,
                summary: this.formatPatientSummary(patientData),
                primaryRecommendations: primaryRecommendations,
                additionalRecommendations: additionalRecommendations,
                followUp: followUp,
                warnings: warnings,
                disclaimer: this.getDisclaimer()
            };
            
            return carePlan;
        } catch (error) {
            console.error("Error generating care plan:", error);
            return {
                success: false,
                message: "An error occurred while generating the care plan. Please try again."
            };
        }
    }
    
    /**
     * Validate that required fields are present
     * @param {Object} data - The patient assessment data
     * @return {boolean} - Whether the data is valid
     */
    validateData(data) {
        // Minimum required fields
        return data.woundType && data.woundLocation && data.patientAge;
    }
    
    /**
     * Format a summary of the patient assessment data
     * @param {Object} data - The patient assessment data
     * @return {string} - The formatted summary
     */
    formatPatientSummary(data) {
        let summary = [];
        
        if (data.patientAge) summary.push(`Patient Age: ${data.patientAge}`);
        if (data.woundType) summary.push(`Wound Type: ${this.formatWoundType(data.woundType)}`);
        if (data.woundStage) summary.push(`Stage: ${this.formatWoundStage(data.woundStage)}`);
        if (data.woundLocation) summary.push(`Location: ${data.woundLocation}`);
        if (data.woundSize) summary.push(`Size: ${data.woundSize}`);
        if (data.exudateAmount) summary.push(`Exudate: ${data.exudateAmount}`);
        if (data.complications && data.complications.length > 0) {
            summary.push(`Complications: ${this.formatComplications(data.complications)}`);
        }
        
        return summary.join('\n');
    }
    
    /**
     * Format wound type for display
     * @param {string} type - The wound type code
     * @return {string} - The formatted wound type
     */
    formatWoundType(type) {
        const types = {
            pressure: "Pressure Ulcer",
            diabetic: "Diabetic Ulcer",
            venous: "Venous Ulcer",
            arterial: "Arterial Ulcer",
            surgical: "Surgical Wound",
            traumatic: "Traumatic Wound"
        };
        
        return types[type] || type;
    }
    
    /**
     * Format wound stage for display
     * @param {string} stage - The wound stage code
     * @return {string} - The formatted wound stage
     */
    formatWoundStage(stage) {
        const stages = {
            stage1: "Stage I",
            stage2: "Stage II",
            stage3: "Stage III",
            stage4: "Stage IV",
            unstageable: "Unstageable",
            deepTissue: "Deep Tissue Injury"
        };
        
        return stages[stage] || stage;
    }
    
    /**
     * Format complications for display
     * @param {Array} complications - The complications array
     * @return {string} - The formatted complications
     */
    formatComplications(complications) {
        if (!Array.isArray(complications)) {
            return complications;
        }
        
        const complicationMap = {
            infection: "Infection",
            diabetes: "Diabetes",
            malnutrition: "Malnutrition",
            vascularDisease: "Vascular Disease",
            immunocompromised: "Immunocompromised"
        };
        
        return complications.map(comp => complicationMap[comp] || comp).join(', ');
    }
    
    /**
     * Get primary care recommendations based on wound type and stage
     * @param {Object} data - The patient assessment data
     * @return {string} - The primary recommendations
     */
    getPrimaryRecommendations(data) {
        const { woundType, woundStage } = data;
        
        // Get recommendations from knowledge base
        if (woundType === 'pressure' && woundStage && this.knowledgeBase.pressure[woundStage]) {
            return this.knowledgeBase.pressure[woundStage];
        } else if (this.knowledgeBase[woundType] && this.knowledgeBase[woundType].general) {
            return this.knowledgeBase[woundType].general;
        }
        
        // Fallback if not found in knowledge base
        return this.getGenericRecommendations(data);
    }
    
    /**
     * Get generic recommendations when specific ones aren't available
     * @param {Object} data - The patient assessment data
     * @return {string} - Generic recommendations
     */
    getGenericRecommendations(data) {
        const { woundType } = data;
        
        // Generic recommendations by wound type
        const genericRecs = {
            pressure: "Assess skin daily. Keep area clean and dry. Reposition every 2 hours. Use pressure redistribution surface. Clean wound with appropriate solution based on wound assessment. Apply dressing appropriate for wound characteristics and exudate amount.",
            diabetic: "Offload pressure from wound. Clean with saline solution. Debride necrotic tissue if present. Apply appropriate dressing based on wound assessment. Monitor blood glucose levels. Assess for signs of infection.",
            venous: "Apply compression therapy as appropriate. Elevate legs. Clean wound gently. Apply appropriate dressing based on exudate level. Consider referral to vascular specialist.",
            arterial: "Protect wound from trauma. Clean gently with saline. Do not use compression. Apply non-adherent dressing. Refer to vascular specialist for evaluation.",
            surgical: "Clean with saline solution. Apply appropriate dressing based on wound depth and exudate. Monitor for signs of infection. Follow surgeon's specific instructions.",
            traumatic: "Clean thoroughly. Remove debris if present. Consider tetanus prophylaxis. Apply appropriate dressing based on wound characteristics."
        };
        
        return genericRecs[woundType] || "Clean wound with saline solution. Apply appropriate dressing based on wound assessment. Reassess regularly for signs of healing or complications.";
    }
    
    /**
     * Get additional recommendations based on complications
     * @param {Object} data - The patient assessment data
     * @return {string} - Additional recommendations
     */
    getAdditionalRecommendations(data) {
        const { complications, exudateAmount } = data;
        let recommendations = [];
        
        // Recommendations based on complications
        if (complications && complications.length > 0) {
            if (complications.includes('infection')) {
                recommendations.push("• Consider antimicrobial dressings and monitor for systemic infection signs.");
                recommendations.push("• Obtain wound culture if purulent drainage is present.");
                recommendations.push("• Consult with provider regarding antibiotic therapy.");
            }
            
            if (complications.includes('diabetes')) {
                recommendations.push("• Ensure optimal glycemic control is maintained.");
                recommendations.push("• Monitor blood glucose levels regularly.");
                recommendations.push("• Evaluate for arterial insufficiency.");
                recommendations.push("• Consider offloading devices for foot wounds.");
            }
            
            if (complications.includes('malnutrition')) {
                recommendations.push("• Initiate nutrition consultation.");
                recommendations.push("• Consider protein supplements.");
                recommendations.push("• Monitor albumin and prealbumin levels if possible.");
                recommendations.push("• Ensure adequate hydration.");
            }
            
            if (complications.includes('vascularDisease')) {
                recommendations.push("• Consider vascular assessment.");
                recommendations.push("• Elevate extremities as appropriate.");
                recommendations.push("• Monitor for peripheral circulation changes.");
                recommendations.push("• Avoid excessive pressure on affected areas.");
            }
            
            if (complications.includes('immunocompromised')) {
                recommendations.push("• Monitor closely for signs of infection.");
                recommendations.push("• Consider more frequent dressing changes.");
                recommendations.push("• Maintain strict aseptic technique during care.");
                recommendations.push("• Consider consultation with infectious disease specialist if infection develops.");
            }
        }
        
        // Recommendations based on exudate
        if (exudateAmount) {
            switch (exudateAmount) {
                case 'heavy':
                    recommendations.push("• Use highly absorbent dressings (alginates, foams, or super absorbent polymers).");
                    recommendations.push("• Consider more frequent dressing changes.");
                    recommendations.push("• Protect periwound skin with barrier products.");
                    break;
                case 'moderate':
                    recommendations.push("• Use moderately absorbent dressings (foams, hydrofibers, or alginates).");
                    recommendations.push("• Change dressing when strike-through is observed.");
                    break;
                case 'minimal':
                    recommendations.push("• Use minimally absorbent dressings (thin foams, hydrocolloids).");
                    recommendations.push("• Avoid dressing that might dry the wound bed.");
                    break;
                case 'none':
                    recommendations.push("• Use moisture-donating dressings (hydrogels).");
                    recommendations.push("• Avoid drying out the wound bed.");
                    break;
            }
        }
        
        return recommendations.join('\n');
    }
    
    /**
     * Get follow-up recommendations
     * @param {Object} data - The patient assessment data
     * @return {string} - Follow-up recommendations
     */
    getFollowUpRecommendations(data) {
        const { woundType } = data;
        
        // Base follow-up recommendations
        let followUp = [
            "Reassess wound at each dressing change.",
            "Document changes in wound appearance, size, and drainage.",
            "Contact healthcare provider if signs of infection develop, wound deteriorates, or fails to show improvement within 2 weeks."
        ];
        
        // Add specific follow-up recommendations by wound type
        if (woundType === 'pressure') {
            followUp.push("Continue pressure redistribution measures and repositioning schedule.");
            followUp.push("Reassess risk factors for new pressure injuries regularly.");
        } else if (woundType === 'diabetic') {
            followUp.push("Monitor blood glucose levels closely.");
            followUp.push("Continue offloading pressure from wound.");
            followUp.push("Schedule regular podiatry follow-up visits.");
        } else if (woundType === 'venous') {
            followUp.push("Maintain compression therapy as directed.");
            followUp.push("Elevate legs above heart level when sitting or lying down.");
            followUp.push("Monitor for signs of skin breakdown under compression devices.");
        } else if (woundType === 'arterial') {
            followUp.push("Monitor for changes in pain level or skin color.");
            followUp.push("Avoid pressure on the affected extremity.");
            followUp.push("Follow up with vascular specialist as scheduled.");
        }
        
        return followUp.join('\n');
    }
    
    /**
     * Get specific warnings based on assessment data
     * @param {Object} data - The patient assessment data
     * @return {string} - Warnings
     */
    getWarnings(data) {
        const { woundType, woundStage, patientAge, complications } = data;
        let warnings = [];
        
        // Age-related warnings
        if (patientAge > 75) {
            warnings.push("Advanced age may slow healing process. Monitor wound closely for signs of progress.");
        }
        
        // Wound type specific warnings
        if (woundType === 'pressure' && (woundStage === 'stage3' || woundStage === 'stage4')) {
            warnings.push("Deep pressure injuries require aggressive treatment and close monitoring. Consider specialty consultation.");
        }
        
        if (woundType === 'arterial') {
            warnings.push("Arterial wounds indicate compromised circulation. Urgent vascular assessment is recommended.");
        }
        
        if (woundType === 'diabetic') {
            warnings.push("Diabetic wounds require diligent monitoring for infection and strict glycemic control.");
        }
        
        // Complication-related warnings
        if (complications) {
            if (complications.includes('infection') && complications.includes('diabetes')) {
                warnings.push("Infected diabetic wounds have increased risk of complications including sepsis and amputation. Consider urgent consultation.");
            }
            
            if (complications.includes('vascularDisease') && (woundType === 'diabetic' || woundType === 'pressure')) {
                warnings.push("Vascular disease can significantly impair healing. Consider vascular assessment prior to extensive debridement.");
            }
        }
        
        return warnings.length > 0 ? warnings.join('\n') : null;
    }
    
    /**
     * Get legal disclaimer
     * @return {string} - The disclaimer text
     */
    getDisclaimer() {
        return "This care plan is generated for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.";
    }
}
