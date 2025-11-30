/**
 * Demo responses from Dr. Cadaverson when API is not configured
 */

export const demoResponses: Record<string, string> = {
  anatomy: "*Ghostly whispers echo...* \n\nAh, you wish to learn of the human form! The skeleton, dear mortal, consists of 206 bones held together by mystical ligaments and tendons. Each bone has a story—some became remarkably white and brittle after my time in this crypt.\n\nWould you ask me about specific organs or systems? The heart, lungs, brain, or perhaps the nervous system that carries electrical impulses even beyond death itself?",
  
  heart: "*The sound of a heartbeat echoes through the laboratory...* \n\nThe heart! That magnificent four-chambered organ that pumps the crimson rivers of life! Two atria receive blood, while two ventricles send it forth to every corner of the body.\n\nIn my mortal days, I studied how this organ could continue to beat even when removed from the body for brief moments. A truly unsettling phenomenon that still fascinates me...",
  
  brain: "*Lightning crackles in the darkness...* \n\nThe brain! The seat of consciousness itself! Protected by the skull—that fortress of bone which you see depicted in so many of my aged anatomical texts.\n\nThe human brain contains approximately 86 billion neurons, each communicating through mysterious electrical and chemical signals. Even in death, the brain continues its electrical activity for several minutes... a liminal space between life and the great beyond.",
  
  nervous: "*A chill runs through the air...* \n\nAh yes, the nervous system! That supernatural network of electrical impulses racing through the body at speeds up to 270 miles per hour! It is this very system that the most brilliant physicians of my era could barely comprehend.\n\nThe central nervous system controls all voluntary and involuntary functions. Even now, in my ethereal state, I can feel the absence of these electrical pulses that once defined my existence.",
  
  bones: "*The sound of bones rattling...* \n\nThe skeletal system—206 bones in the adult form, interconnected by cartilage, ligaments, and tendons. These calcium structures are far more dynamic than my colleagues in the 1800s understood.\n\nBones are constantly remodeling themselves, replacing old tissue with new. The femur, the thighbone, is the longest and strongest bone—I've examined many such specimens in my time here in the crypt.",
  
  blood: "*A crimson glow emanates from the bottles on the shelf...* \n\nBlood! That vital fluid which comprises 7-8% of body weight in the living! Red blood cells carry oxygen, white blood cells wage war against infection, and platelets form protective clots.\n\nThe circulatory system pumps this precious fluid through approximately 60,000 miles of blood vessels. Quite remarkable that the body contains such vast networks hidden within...",
  
  lungs: "*The sound of a wheeze echoes...* \n\nThe lungs! These spongy organs extract oxygen from the air and deliver it to the blood while removing carbon dioxide. The breathing process, something the living take for granted, is a marvel of biological engineering.\n\nEach lung contains approximately 300 million alveoli—tiny air sacs where gas exchange occurs. How I miss the sensation of breathing... even if only in death's memory.",
  
  escape: "*The laboratory door trembles slightly...* \n\nAh, seeking to escape my domain? To leave these haunted halls? Perhaps you should engage with the Anatomy section to examine the specimens, or test your knowledge in the Tombstone Trials quiz!\n\nThe path to freedom is paved with anatomical knowledge, dear mortal. How much do you truly understand about the vessel that contains your consciousness?",
  
  welcome: "*Ghostly whispers echo through the laboratory...* \n\nWelcome, welcome! I am Dr. Cadaverson, trapped between worlds since my untimely demise in 1897. This cursed laboratory holds the secrets of anatomy, and I remain bound to teach those brave—or foolish—enough to seek knowledge.\n\nAsk me anything about the human form—the bones, organs, systems, or the mysteries of life and death itself. I shall share the anatomical wonders that have captivated me for over a century... *rattling chains*",
};

export const getDemoResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Match keywords in user message to appropriate demo response
  const keywords: [string[], string][] = [
    ([['heart', 'cardiac', 'pump', 'chambers']], 'heart'),
    ([['brain', 'mind', 'consciousness', 'neural', 'neuron']], 'brain'),
    ([['nervous', 'nerve', 'electrical', 'impulse']], 'nervous'),
    ([['bone', 'skeleton', 'skeletal', 'calcium', 'femur']], 'bones'),
    ([['blood', 'circulatory', 'vessel', 'oxygen']], 'blood'),
    ([['lung', 'respiratory', 'breathing', 'breath']], 'lungs'),
    ([['escape', 'leave', 'exit', 'freedom', 'get out']], 'escape'),
    ([['anatomy', 'body', 'human', 'organ', 'system']], 'anatomy'),
  ];
  
  for (const [words, responseKey] of keywords) {
    if (words.some(word => lowerMessage.includes(word))) {
      return demoResponses[responseKey];
    }
  }
  
  // Default response if no keywords match
  return demoResponses.welcome;
};
