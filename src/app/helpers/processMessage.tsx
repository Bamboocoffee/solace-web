/**
   * This function parses a raw text from the backend to ensure messages are
   * 1) separated on lines
   * 2) hyperlinks created 
   * @param rawText 
   * @returns 
   */
export const processMessage = async (message: string, startingId: number) => {

    // Step 1: Split the text block into lines
   const lines = message.split("\n");

   // Step 2: Process each line to detect and convert URLs into hyperlinks
   const linkRegex = /(\w+)\s\((https?:\/\/[^\s)]+)\)/g;

   
   // Step 3: Process each line and replace links
   return lines.map((line, index) => {
    const processedLine = line.replace(linkRegex, (match, text, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    });

    return {
      id: `${Date.now()}-${index}`, // Unique ID using timestamp and index
      content: line, // Raw line content
      processedContent: processedLine, // HTML-safe content with links
      isUser: false, // These are assistant messages
    };
   });
 }