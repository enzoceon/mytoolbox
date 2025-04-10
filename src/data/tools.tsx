
// Find the tool with path "/image-to-qr" and set isFunctional to false
const tools: ToolType[] = tools.map(tool => 
  tool.path === "/image-to-qr" 
    ? { ...tool, isFunctional: false } 
    : tool
);

export default tools;
