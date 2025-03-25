/**
 * AI Care Planner Chatbot
 * This script handles the chat functionality for the wound care assistant.
 * It processes user queries, searches through the knowledge base, and generates responses.
 */

class WoundCareBot {
    constructor(knowledgeBase, faqDatabase) {
        this.knowledgeBase = knowledgeBase;
        this.faqDatabase = faqDatabase;
        this.chatHistory = [];
        this.woundTypes = Object.keys(knowledgeBase);
        
        // Common keywords for different categories
        this.keywordMap = {
            dressing: ['dressing', 'bandage', 'gauze', 'wrap', 'cover'],
            infection: ['infection', 'infected', 'pus', 'odor', 'redness', 'swelling', 'fever'],
            prevention: ['prevent', 'prevention', 'avoid', 'risk'],
            stages: ['stage', 'grade', 'level', 'severity'],
            healing: ['heal', 'healing', 'recovery', 'improve'],
            assessment: ['assess', 'evaluation', 'measure', 'observe', 'check'],
            cleaning: ['clean', 'cleanse', 'wash', 'irrigate', 'rinse']
        };
    }
    
    /**
     * Process a user query and generate a response
     * @param {string} query - The user's message
     * @return {string} - The AI response
     */
    processQuery(query) {
        // Store query in chat history
        this.chatHistory.push({ role: 'user', content: query });
        
        // Clean and preprocess the query
        const processedQuery = this.preprocessQuery(query);
        
        // Search for a response
        const response = this.searchForResponse(processedQuery);
        
        // Store response in chat history
        this.chatHistory.push({ role: 'assistant', content: response });
        
        return response;
    }
    
    /**
     * Clean and preprocess the user's query
     * @param {string} query - The raw user query
     * @return {string} - The preprocessed query
     */
    preprocessQuery(query) {
        // Convert to lowercase
        let processed = query.toLowerCase();
        
        // Remove punctuation
        processed = processed.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        
        // Remove extra spaces
        processed = processed.replace(/\s{2,}/g, ' ').trim();
        
        return processed;
    }
    
    /**
     * Search the knowledge base for a response to the user's query
     * @param {string} query - The preprocessed user query
     * @return {string} - The response to the user
     */
    searchForResponse(query) {
        // Check if query is a greeting
        if (this.isGreeting(query)) {
            return this.getGreetingResponse();
        }
        
        // Check FAQ database for direct matches
        const faqResponse = this.searchFAQ(query);
        if (faqResponse) {
            return faqResponse;
        }
        
        // Check for wound type mentions
        const woundTypeResponse = this.searchWoundType(query);
        if (woundTypeResponse) {
            return woundTypeResponse;
        }
        
        // Check for category keywords
        const categoryResponse = this.searchCategory(query);
        if (categoryResponse) {
            return categoryResponse;
        }
        
        // If no specific match, return a default response
        return this.getDefaultResponse();
    }
    
    /**
     * Check if the query is a greeting
     * @param {string} query - The preprocessed query
     * @return {boolean} - Whether the query is a greeting
     */
    isGreeting(query) {
        const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => query.includes(greeting));
    }
    
    /**
     * Get a greeting response
     * @return {string} - A greeting response
     */
    getGreetingResponse() {
        const responses = [
            "Hello! I'm the AI Care Planner assistant. How can I help with wound care today?",
            "Hi there! I can help answer questions about wound care or generate a personalized care plan. What would you like to know?",
            "Welcome to the AI Care Planner. I'm here to assist with wound care information and recommendations. How can I help you?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    /**
     * Search the FAQ database for a response
     * @param {string} query - The preprocessed query
     * @return {string|null} - The FAQ response or null if not found
     */
    searchFAQ(query) {
        // First check for exact matches in the FAQ keys
        for (const key in this.faqDatabase) {
            if (query === key.toLowerCase()) {
                return this.faqDatabase[key];
            }
        }
        
        // Then check for partial matches
        for (const key in this.faqDatabase) {
            const keyWords = key.toLowerCase().split(' ');
            // Check if all words in the key are present in the query
            const allWordsPresent = keyWords.every(word => query.includes(word));
            
            if (allWordsPresent) {
                return this.faqDatabase[key];
            }
        }
        
        // Check if any key is a substring of the query
        for (const key in this.faqDatabase) {
            if (query.includes(key.toLowerCase())) {
                return this.faqDatabase[key];
            }
        }
        
        return null;
    }
    
    /**
     * Search for wound type mentions in the query
     * @param {string} query - The preprocessed query
     * @return {string|null} - The wound type response or null if not found
     */
    searchWoundType(query) {
        // Extract wound type from query
        let foundWoundType = null;
        
        for (const woundType of this.woundTypes) {
            if (query.includes(woundType)) {
                foundWoundType = woundType;
                break;
            }
        }
        
        if (!foundWoundType) {
            return null;
        }
        
        // For pressure ulcers, try to determine the stage
        if (foundWoundType === 'pressure') {
            const stages = ['stage1', 'stage2', 'stage3', 'stage4', 'unstageable', 'deep tissue'];
            
            // Try to find stage mentions like "stage 2" or "stage II"
            let foundStage = null;
            
            // Check for numeric stages (stage 1, stage 2, etc.)
            const stageMatch = query.match(/stage\s*([1-4])/i);
            if (stageMatch) {
                foundStage = `stage${stageMatch[1]}`;
            }
            
            // Check for roman numeral stages (stage I, stage II, etc.)
            const romanMatch = query.match(/stage\s*(i{1,3}v?|iv|v?i{0,3})/i);
            if (romanMatch && !foundStage) {
                const roman = romanMatch[1].toLowerCase();
                if (roman === 'i') foundStage = 'stage1';
                else if (roman === 'ii') foundStage = 'stage2';
                else if (roman === 'iii') foundStage = 'stage3';
                else if (roman === 'iv') foundStage = 'stage4';
            }
            
            // Check for explicit stage keywords
            for (const stage of stages) {
                if (query.includes(stage.toLowerCase())) {
                    foundStage = stage;
                    break;
                }
            }
            
            if (foundStage && this.knowledgeBase[foundWoundType][foundStage]) {
                return `For ${foundWoundType} ulcers, ${foundStage}: ${this.knowledgeBase[foundWoundType][foundStage]}`;
            }
            
            // If no specific stage found, provide general pressure ulcer info
            return "For pressure ulcers, treatment depends on the stage. Please specify the stage (I-IV, unstageable, or deep tissue injury) for more specific recommendations.";
        }
        
        // For other wound types, return general info
        if (this.knowledgeBase[foundWoundType] && this.knowledgeBase[foundWoundType]['general']) {
            return `For ${foundWoundType} wounds: ${this.knowledgeBase[foundWoundType]['general']}`;
        }
        
        return null;
    }
    
    /**
     * Search for category keywords in the query
     * @param {string} query - The preprocessed query
     * @return {string|null} - The category response or null if not found
     */
    searchCategory(query) {
        for (const category in this.keywordMap) {
            const keywords = this.keywordMap[category];
            for (const keyword of keywords) {
                if (query.includes(keyword)) {
                    return this.getCategoryResponse(category);
                }
            }
        }
        
        return null;
    }
    
    /**
     * Get a response for a specific category
     * @param {string} category - The category name
     * @return {string} - The category response
     */
    getCategoryResponse(category) {
        switch (category) {
            case 'dressing':
                return "Dressing selection depends on wound type, exudate amount, and location. Common dressings include:\n" +
                       "- Hydrocolloid: For minimal to moderate exudate\n" +
                       "- Foam: For moderate to heavy exudate\n" +
                       "- Alginate: For heavily exudating wounds\n" +
                       "- Hydrogel: For dry wounds needing moisture\n" +
                       "- Transparent film: For protection or securing other dressings\n" +
                       "Change frequency depends on the dressing type and wound condition. Always follow specific product instructions.";
                       
            case 'infection':
                return "Signs of wound infection include increased pain, redness, swelling, warmth, purulent drainage (pus), foul odor, fever, and increased wound size. If infection is suspected, contact a healthcare provider immediately. Treatment may include antimicrobial dressings, topical antiseptics, or systemic antibiotics depending on severity.";
                
            case 'prevention':
                return "Wound prevention strategies include:\n" +
                       "- Regular skin inspection, especially over bony prominences\n" +
                       "- Keeping skin clean and dry\n" +
                       "- Moisturizing dry skin\n" +
                       "- Proper nutrition and hydration\n" +
                       "- Pressure redistribution surfaces for at-risk patients\n" +
                       "- Regular repositioning (every 2 hours for immobile patients)\n" +
                       "- Protecting skin from moisture, friction, and shear\n" +
                       "- Managing underlying conditions like diabetes";
                       
            case 'stages':
                return "Pressure ulcer staging:\n" +
                       "- Stage I: Non-blanchable erythema (redness) of intact skin\n" +
                       "- Stage II: Partial-thickness skin loss with exposed dermis\n" +
                       "- Stage III: Full-thickness skin loss (fat visible)\n" +
                       "- Stage IV: Full-thickness skin and tissue loss with exposed muscle, tendon, or bone\n" +
                       "- Unstageable: Obscured full-thickness skin and tissue loss\n" +
                       "- Deep Tissue Injury: Persistent non-blanchable deep red, maroon, or purple discoloration";
                       
            case 'healing':
                return "Wound healing occurs in four overlapping phases:\n" +
                       "1. Hemostasis: Blood clotting (minutes to hours)\n" +
                       "2. Inflammation: Immune response and cleaning (1-4 days)\n" +
                       "3. Proliferation: New tissue formation (4-21 days)\n" +
                       "4. Maturation: Scar formation and remodeling (21 days to 2 years)\n\n" +
                       "Factors that impair healing include poor nutrition, infection, advanced age, chronic diseases (diabetes, vascular disease), medications (steroids, chemotherapy), and poor wound care practices.";
                       
            case 'assessment':
                return "Wound assessment should include:\n" +
                       "- Location and wound type\n" +
                       "- Size (length, width, depth)\n" +
                       "- Wound bed appearance and tissue type\n" +
                       "- Exudate amount and characteristics\n" +
                       "- Wound edges and surrounding skin\n" +
                       "- Signs of infection\n" +
                       "- Pain level\n" +
                       "- Previous treatments and response\n" +
                       "Document findings at each dressing change to track healing progress.";
                       
            case 'cleaning':
                return "Wound cleaning recommendations:\n" +
                       "- Use normal saline or wound cleansers (avoid antiseptics on clean granulating wounds)\n" +
                       "- Clean from clean to dirty areas\n" +
                       "- Use gentle irrigation with 4-15 PSI pressure (syringe with 19G needle)\n" +
                       "- Pat dry surrounding skin gently\n" +
                       "- Avoid scrubbing the wound bed\n" +
                       "- Warm solutions to body temperature for patient comfort\n" +
                       "- Clean at each dressing change";
                       
            default:
                return null;
        }
    }
    
    /**
     * Get a default response when no matches are found
     * @return {string} - A default response
     */
    getDefaultResponse() {
        const responses = [
            "I'm not sure I understand your question. Could you rephrase or ask about a specific wound type, dressing, or care technique?",
            "I don't have specific information about that. Would you like to know about pressure ulcers, diabetic wounds, venous ulcers, arterial ulcers, surgical wounds, or wound care techniques?",
            "I'm not finding specific information for that query. Try asking about wound assessment, dressing selection, signs of infection, or wound healing processes."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    /**
     * Get wound care resources for further reading
     * @return {string} - Resource information
     */
    getResources() {
        return "For more detailed wound care information, please consult these trusted resources:\n" +
               "- National Pressure Injury Advisory Panel (NPIAP): https://npiap.com\n" +
               "- Wound, Ostomy and Continence Nurses Society: https://www.wocn.org\n" +
               "- Agency for Healthcare Research and Quality: https://www.ahrq.gov\n" +
               "Always consult with a healthcare professional for specific patient care.";
    }
    
    /**
     * Get the chat history
     * @return {Array} - The chat history
     */
    getChatHistory() {
        return this.chatHistory;
    }
    
    /**
     * Clear the chat history
     */
    clearChatHistory() {
        this.chatHistory = [];
    }
}

// Initialize the chatbot when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if knowledge base variables exist
    if (typeof woundCareKnowledge === 'undefined' || typeof faqDatabase === 'undefined') {
        console.error('Knowledge base not found. Make sure woundcare-db.js is loaded before chatbot.js');
        return;
    }
    
    // Create chatbot instance
    const chatbot = new WoundCareBot(woundCareKnowledge, faqDatabase);
    
    // UI elements
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'ai-message', 'typing-indicator');
        indicator.id = 'typingIndicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Event listener for sending messages
    sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            // Display user message
            addMessage(message, true);
            
            // Show typing indicator
            showTypingIndicator();
            
            // Process query with a slight delay to simulate thinking
            setTimeout(() => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Get response from chatbot
                const response = chatbot.processQuery(message);
                
                // Display chatbot response
                addMessage(response, false);
            }, 1000);
            
            // Clear input field
            userInput.value = '';
        }
    });
    
    // Event listener for enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
