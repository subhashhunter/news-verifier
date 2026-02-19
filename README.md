# Web Branch Progress Update

Web Branch Progress Update

1. Backend Verification Engine
Current system verifies a news claim using multiple sources and returns a structured response with accuracy and verdict.

2. Backend Setup

Express server created
Modular folder structure added
.env configuration for API keys
Routes and controllers structured

3. Verification Pipeline
Text → Router → Multiple APIs → Analyzer → Response

APIs currently used:
Wikipedia ,
GNews ,
NewsAPI ,
DuckDuckGo 

⚠ Current Limitation

Very recent news may not appear immediately in free news APIs.
System will be improved to handle recent events better.
