/**
 * AI Care Planner - Wound Care Knowledge Database
 * This file contains the structured knowledge base derived from wound care documents
 * Used by the AI Care Planner to provide evidence-based recommendations
 */

/**
 * Wound care knowledge base organized by wound type and stage
 * Contains treatment recommendations for different wound types
 */
const woundCareKnowledge = {
    'pressure': {
        'stage1': 'Assess skin daily. Keep area clean and dry. Apply protective barrier cream. Reposition every 2 hours. Use pressure redistribution surface. Protect from friction and shear. Ensure adequate nutrition and hydration.',
        
        'stage2': 'Clean wound with saline solution. Apply hydrocolloid or foam dressing. Change dressing every 3-7 days or when leakage occurs. Reposition every 2 hours. Use pressure redistribution surface. Protect surrounding skin with barrier product. Monitor for signs of infection. Ensure adequate nutrition with focus on protein intake.',
        
        'stage3': 'Clean wound with saline solution. Pack wound with alginate or hydrogel as appropriate for wound bed moisture. Cover with foam dressing. Change dressing daily or when saturated. Consider negative pressure wound therapy for appropriate candidates. Obtain wound culture if signs of infection present. Provide pressure redistribution surface. Consult dietitian for nutritional support. Consider specialty wound care consult.',
        
        'stage4': 'Surgical consultation may be needed. Clean wound with saline solution. Pack wound with alginate or hydrogel based on wound characteristics. Cover with foam dressing. Change dressing daily or when saturated. Consider negative pressure wound therapy. Assess for osteomyelitis if bone is exposed. Provide bariatric pressure redistribution surface. Implement comprehensive nutrition plan with protein supplementation. Monitor for complications including tunneling and undermining.',
        
        'unstageable': 'Do not remove stable, dry eschar unless infected. Keep area clean and dry. Monitor for signs of infection including erythema and fluctuance of surrounding tissue. Surgical debridement may be needed for infected wounds. Provide pressure redistribution surface. Reposition every 2 hours. Optimize nutrition and hydration. Reassess when eschar softens or lifts to determine true stage.',
        
        'deepTissue': 'Observe area closely and protect from further pressure. Do not massage area. Use pressure redistribution surface. Reposition frequently. Monitor for changes in tissue integrity as deep tissue injury may evolve into a higher stage pressure injury. Keep area clean and dry. Ensure optimal nutrition with adequate protein intake. Document changes in appearance daily.'
    },
    
    'diabetic': {
        'general': 'Offload pressure from wound. Clean with saline solution. Debride necrotic tissue if present and appropriate. Apply hydrogel for dry wounds or foam/alginate for exudating wounds. Assess for infection. Monitor blood glucose levels, aiming for optimal glycemic control. Consider specialized footwear to prevent further ulceration. Evaluate vascular status. Provide comprehensive diabetes management education. Consider advanced therapies for wounds not progressing with standard care after 4 weeks.'
    },
    
    'venous': {
        'general': 'Clean with saline solution. Apply compression therapy (30-40 mmHg) if arterial supply adequate. Elevate legs above heart level when sitting or lying down. Apply zinc oxide impregnated bandage or foam dressing based on exudate level. Change dressing 2-3 times per week or when strike-through occurs. Protect periwound skin with barrier cream. Consider pentoxifylline or aspirin therapy in consultation with provider. Encourage walking and ankle exercises. Provide education on long-term compression therapy needs.'
    },
    
    'arterial': {
        'general': 'Protect wound with non-adherent dressing. Do not use compression. Keep wound clean and moist. Consult vascular surgeon for evaluation and possible revascularization. Avoid trauma to lower extremities. Position with feet dependent if rest pain present. Manage pain as prescribed. Monitor for signs of infection. Keep dressings minimal to avoid pressure on compromised tissue. Educate on smoking cessation if applicable.'
    },
    
    'surgical': {
        'general': 'Clean with saline solution. Apply appropriate dressing based on exudate amount - non-adherent or impregnated gauze for minimal exudate, foam for moderate exudate. Monitor for signs of infection including increased pain, erythema, or purulent drainage. Remove sutures/staples as ordered. Support wound edges with steri-strips if needed after suture removal. Educate on activity restrictions. Ensure adequate nutrition for healing. Report dehiscence or evisceration immediately.'
    },
    
    'traumatic': {
        'general': 'Clean thoroughly with saline solution. Remove debris if present. Consider tetanus prophylaxis if indicated. Apply appropriate dressing based on wound type and exudate. For abrasions, consider transparent film. For lacerations, steri-strips or sutures may be needed. For contusions, monitor for expanding hematoma. Elevate injured extremity if edema present. Assess for underlying structural damage. Monitor for signs of infection. Manage pain appropriately.'
    },
    
    'burn': {
        'superficial': 'Cool burn with room temperature water for 10-15 minutes (if within first hour). Clean gently with mild soap and water. Apply moisturizer or aloe vera gel. Cover with non-adherent dressing if needed. Do not use ice. Protect from sun exposure during healing. Manage pain with prescribed analgesics.',
        
        'partial': 'Clean gently with mild soap and water or saline. Apply antimicrobial dressing such as silver sulfadiazine or silver-impregnated dressing. Cover with bulky dressing to absorb exudate and protect. Change dressing daily or as recommended. Elevate burned extremity. Manage pain. Monitor for signs of infection. Consider burn specialist referral for burns >10% BSA.',
        
        'full': 'Immediate emergency department evaluation required. Until transport: Cover with clean, dry sheet or dressing. Do not apply creams or ointments. Keep patient warm. Elevate burned extremities. Monitor for signs of shock. Do not remove clothing stuck to burn. Do not break blisters.'
    }
};

/**
 * Frequently asked questions database
 * Contains common questions and evidence-based answers about wound care
 */
const faqDatabase = {
    'how often should dressings be changed': 'Dressing change frequency depends on the wound type and exudate amount. Generally:\n- Hydrocolloid: Every 3-7 days\n- Foam: Every 2-4 days\n- Alginate: When saturated or every 1-3 days\n- Hydrogel: Daily or every other day\n- Transparent film: Up to 7 days\nAlways change dressings if they become loose, saturated, or if there are signs of infection. Follow specific product instructions and adjust based on wound assessment.',
    
    'signs of infection': 'Signs of wound infection include: increased pain, increased redness or warmth around the wound, swelling, purulent drainage (pus), foul odor, fever, and increased wound size. Delayed healing can also indicate infection. If infection is suspected, contact the healthcare provider immediately for evaluation and possible treatment with topical antimicrobials or systemic antibiotics.',
    
    'pressure ulcer prevention': 'Pressure ulcer prevention strategies include: frequent repositioning (every 2 hours if mobility limited), use of pressure redistribution surfaces (specialty mattresses, cushions), daily skin assessment with particular attention to bony prominences, keeping skin clean and dry, proper nutrition and hydration, minimizing friction and shear forces during transfers, and early mobility when possible. For high-risk patients, implement a comprehensive preventive protocol and document interventions.',
    
    'debridement methods': 'Common debridement methods include:\n- Autolytic: Using the body\'s enzymes with moisture-retentive dressings\n- Enzymatic: Applying topical enzymes to break down necrotic tissue\n- Mechanical: Wet-to-dry dressings, irrigation, or ultrasonic debridement\n- Sharp/Surgical: Using scalpel, scissors, or forceps (requires trained professional)\n- Biological: Maggot therapy using medical-grade larvae\nThe method chosen depends on wound characteristics, patient factors, available resources, and provider expertise.',
    
    'wound healing stages': 'The four stages of wound healing are:\n1. Hemostasis: Blood clotting forms a scab (minutes to hours)\n2. Inflammation: Increased blood flow and white blood cells clean the wound (1-4 days)\n3. Proliferation: New tissue formation with granulation, contraction, and epithelialization (4-21 days)\n4. Maturation/Remodeling: Collagen reorganization and scar formation (21 days to 2 years)\nHealing time varies based on wound size, depth, location, patient factors, and wound care practices.',
    
    'how to measure wounds': 'Measure wounds consistently using the clock face method (head is 12 o\'clock). Record length (head to toe, 12 to 6 o\'clock), width (side to side, 3 to 9 o\'clock), and depth (deepest point using a cotton-tipped applicator). Measure and document undermining or tunneling with a probe, noting location using clock positions. Use centimeters for all measurements. Consider wound tracing or photography to document progress over time. Measure at regular intervals to track healing.',
    
    'wound bed preparation': 'Wound bed preparation follows the TIME framework:\nT - Tissue management (removal of non-viable tissue)\nI - Infection and inflammation control\nM - Moisture balance (maintain moist wound environment without maceration)\nE - Edge advancement (ensure epithelial advancement from wound edges)\nProper preparation creates an optimal healing environment. Clean the wound, debride non-viable tissue, manage bacterial balance, and maintain appropriate moisture level.',
    
    'wound assessment': 'Comprehensive wound assessment includes:\n- Location and wound type\n- Size (length, width, depth)\n- Wound bed appearance (tissue types: granulation, slough, eschar)\n- Exudate amount and characteristics\n- Wound edges and periwound skin condition\n- Pain level\n- Odor\n- Duration of wound\n- Previous treatments and response\nUse a consistent documentation method and reassess regularly to track healing progress.',
    
    'nutrition for wound healing': 'Optimal nutrition for wound healing includes:\n- Protein: 1.2-1.5 g/kg body weight daily (essential for tissue repair)\n- Calories: 30-35 calories/kg body weight daily\n- Hydration: 30-35 mL/kg body weight daily\n- Vitamin C: Supports collagen formation\n- Zinc: Supports protein synthesis and cell proliferation\n- Vitamin A: Supports epithelialization and immune function\n- Vitamin D: Supports immune function\nConsider nutritional supplements for patients with poor intake or increased needs. Consult with dietitian for comprehensive nutritional assessment.',
    
    'wound documentation': 'Effective wound documentation should include:\n- Date and time of assessment\n- Wound location (using anatomical terms)\n- Wound measurements (length, width, depth)\n- Wound bed characteristics (tissue types and percentages)\n- Exudate amount, color, consistency, and odor\n- Periwound skin condition\n- Pain assessment\n- Interventions performed\n- Dressings applied\n- Patient tolerance of procedure\n- Patient education provided\nUse consistent terminology and consider photographic documentation when appropriate.',
    
    'negative pressure wound therapy': 'Negative Pressure Wound Therapy (NPWT) applies controlled suction to a wound through a sealed dressing. Indications include: diabetic ulcers, pressure injuries stages 3-4, surgical wounds, traumatic wounds, and certain burns. Contraindications include: untreated osteomyelitis, malignancy in the wound, exposed vessels/organs, untreated coagulopathy, and necrotic tissue with eschar. Typical settings range from -75 to -125 mmHg, continuously or intermittently. Change dressing every 48-72 hours or per manufacturer guidelines.',
    
    'wound pain management': 'Wound pain management strategies include:\n- Procedural pain: Apply topical lidocaine (4%) 15-30 minutes before dressing changes\n- Systemic analgesics: Schedule before anticipated painful procedures\n- Non-pharmacological: Relaxation techniques, distraction, music therapy\n- Dressing selection: Choose non-adherent dressings that minimize trauma during removal\n- Technique: Soak adherent dressings before removal, use gentle technique\n- Environment: Ensure comfortable temperature and privacy\nAssess pain using standardized scale and document effectiveness of interventions.',
    
    'when to refer to wound specialist': 'Consider referral to wound specialist when:\n- Wound fails to show improvement after 2-4 weeks of standard care\n- Wound deteriorates or increases in size\n- Recurrent wounds in same location\n- Suspected deep tissue infection or osteomyelitis\n- Wounds with exposed tendon, bone, or joint\n- Complex wounds requiring advanced therapies\n- Arterial insufficiency requiring revascularization\n- Multiple co-morbidities complicating healing\nEarly referral can improve outcomes and reduce healing time for complex wounds.',
    
    'compression therapy': 'Compression therapy is primary treatment for venous ulcers and venous insufficiency. Options include:\n- Elastic bandages: Provide sustained compression but require skilled application\n- Inelastic/short-stretch bandages: Provide high working pressure during activity\n- Multi-layer systems: Combine padding, compression, and cohesive layers\n- Compression stockings: Available in various pressure gradients (15-20, 20-30, 30-40, 40-50 mmHg)\nContraindicated in arterial disease (ABPI <0.8), acute DVT, severe heart failure, or severe peripheral neuropathy. Assess arterial circulation before applying compression.',
    
    'wound cleansing': 'Wound cleansing best practices:\n- Use normal saline or commercial wound cleanser for most wounds\n- Water (tap, distilled, or boiled) may be appropriate for some wounds\n- Cleanse at each dressing change\n- Irrigation pressure: 4-15 PSI (syringe with 19G needle or commercial irrigator)\n- Cleanse from clean to dirty areas\n- Avoid antiseptics (povidone-iodine, hydrogen peroxide, chlorhexidine) on clean granulating wounds\n- Pat dry periwound skin gently\n- Warmed solutions improve patient comfort\nGoal is to remove debris and excess exudate without damaging healthy tissue.',
    
    'offloading for diabetic foot ulcers': 'Offloading methods for diabetic foot ulcers include:\n- Total contact casting: Gold standard, forces compliance\n- Removable cast walkers: Effective when made irremovable\n- Half shoes/healing sandals: Offload forefoot or hindfoot\n- Felt/foam padding: Redistributes pressure away from ulcer\n- Custom therapeutic footwear: For healed ulcers to prevent recurrence\nConsistent offloading is essential for healing. Select method based on ulcer location, patient mobility, compliance, and resources. Continue offloading until complete wound closure.',
    
    'hyperbaric oxygen therapy': 'Hyperbaric Oxygen Therapy (HBOT) involves breathing 100% oxygen in a pressurized chamber, typically at 2.0-2.5 atmospheres for 90-120 minutes per session. Indications for wound care include: diabetic foot ulcers not responding to standard care, compromised skin grafts/flaps, necrotizing soft tissue infections, osteomyelitis, and delayed radiation injury. Typical treatment course is 20-40 sessions. Contraindications include untreated pneumothorax, certain chemotherapy agents, and claustrophobia. HBOT should be used as adjunctive therapy alongside standard wound care.',
    
    'wound dressing selection': 'Wound dressing selection principles:\n- Match dressing to wound characteristics and healing goals\n- For dry wounds: Hydrogel, hydrocolloid to add moisture\n- For minimal exudate: Thin foam, hydrocolloid, transparent film\n- For moderate exudate: Foam, hydrofiber, alginate\n- For heavy exudate: Alginate, hydrofiber, super absorbent polymers\n- For infected wounds: Silver or other antimicrobial dressings\n- For necrotic wounds: Hydrogel for autolytic debridement\n- For malodorous wounds: Charcoal dressings\nConsider dressing change frequency, ease of application, cost, and patient comfort. Reassess and adjust as wound characteristics change.'
};

/**
 * Wound assessment rubric for standardized evaluation
 * Used to guide objective wound assessment
 */
const woundAssessmentRubric = {
    'wound bed appearance': {
        'granulation': 'Red, moist, granular tissue; optimal for healing',
        'epithelialization': 'Pink or white new skin growth from edges or islands',
        'slough': 'Yellow/white fibrinous tissue; requires debridement',
        'eschar': 'Black/brown necrotic tissue; may need debridement',
        'fibrin': 'Sticky yellow/white stringy tissue on wound surface'
    },
    
    'exudate amount': {
        'none': 'Wound tissue dry',
        'minimal': 'Wound tissue moist; no measurable exudate',
        'moderate': 'Wound tissues saturated; drainage involves ≤75% dressing',
        'heavy': 'Wound tissues bathed in fluid; drainage involves >75% dressing'
    },
    
    'exudate type': {
        'serous': 'Clear, watery plasma',
        'sanguineous': 'Fresh bleeding, bright red',
        'serosanguineous': 'Pink-red, watery',
        'purulent': 'Thick, opaque yellow/green/brown drainage (indicates infection)'
    },
    
    'periwound condition': {
        'intact': 'Skin intact with normal appearance',
        'macerated': 'White, soggy skin due to excessive moisture',
        'erythematous': 'Redness, may indicate inflammation or early pressure damage',
        'indurated': 'Abnormally hard tissue when palpated',
        'edematous': 'Swollen due to excess fluid in tissues',
        'excoriated': 'Abraded or scraped skin',
        'dry/flaky': 'Dehydrated skin lacking moisture'
    }
};

/**
 * Risk assessment scales for wound prevention and management
 * Used to identify patients at risk and guide preventive interventions
 */
const riskAssessmentScales = {
    'braden scale': {
        'purpose': 'Pressure ulcer risk assessment',
        'parameters': [
            'Sensory perception', 'Moisture', 'Activity', 'Mobility', 
            'Nutrition', 'Friction and shear'
        ],
        'scoring': '6-23 points: ≤9 (Severe risk), 10-12 (High risk), 13-14 (Moderate risk), 15-18 (Mild risk), ≥19 (No risk)'
    },
    
    'wagner scale': {
        'purpose': 'Diabetic foot ulcer classification',
        'grades': [
            'Grade 0: Intact skin with bony deformity',
            'Grade 1: Superficial ulcer',
            'Grade 2: Deep ulcer to tendon or joint capsule',
            'Grade 3: Deep ulcer with abscess or osteomyelitis',
            'Grade 4: Partial foot gangrene',
            'Grade 5: Whole foot gangrene'
        ]
    },
    
    'push tool': {
        'purpose': 'Pressure ulcer healing assessment',
        'parameters': ['Surface area', 'Exudate amount', 'Tissue type'],
        'scoring': '0-17 points: Decreasing scores indicate wound healing'
    },
    
    'WIfI classification': {
        'purpose': 'Threatened lower extremity assessment',
        'parameters': [
            'Wound (0-3)', 'Ischemia (0-3)', 'foot Infection (0-3)'
        ],
        'application': 'Guides need for revascularization and amputation risk'
    }
};

/**
 * Advanced wound therapy information
 * Describes specialized treatments for complex or non-healing wounds
 */
const advancedTherapies = {
    'negative pressure wound therapy': {
        'mechanism': 'Applies controlled subatmospheric pressure to wound bed',
        'benefits': [
            'Removes excess exudate', 'Reduces edema', 'Increases blood flow',
            'Promotes granulation tissue formation', 'Reduces wound size'
        ],
        'indications': [
            'Diabetic ulcers', 'Pressure injuries stages 3-4', 'Surgical wounds',
            'Traumatic wounds', 'Skin grafts/flaps'
        ],
        'contraindications': [
            'Untreated osteomyelitis', 'Malignancy in wound', 'Exposed vessels',
            'Necrotic tissue with eschar', 'Untreated coagulopathy'
        ]
    },
    
    'hyperbaric oxygen therapy': {
        'mechanism': 'Delivers 100% oxygen under increased atmospheric pressure',
        'benefits': [
            'Increases oxygenation to hypoxic wound tissues',
            'Enhances neutrophil killing activity',
            'Promotes angiogenesis',
            'Reduces edema'
        ],
        'indications': [
            'Diabetic foot ulcers', 'Compromised grafts/flaps',
            'Necrotizing infections', 'Radiation injuries', 'Refractory osteomyelitis'
        ]
    },
    
    'bioengineered skin substitutes': {
        'types': [
            'Allografts (cadaveric dermis)',
            'Xenografts (porcine/bovine dermis)',
            'Dermal matrices (acellular)',
            'Living cell therapy (containing fibroblasts and/or keratinocytes)'
        ],
        'indications': [
            'Diabetic foot ulcers', 'Venous ulcers', 'Burns',
            'Surgical/traumatic wounds'
        ]
    },
    
    'growth factors': {
        'types': [
            'Platelet-derived growth factor (PDGF)',
            'Epidermal growth factor (EGF)',
            'Platelet-rich plasma (PRP)'
        ],
        'mechanism': 'Promotes cellular migration, proliferation, and ECM formation',
        'indications': 'Diabetic neuropathic ulcers, pressure injuries, chronic wounds'
    }
};
