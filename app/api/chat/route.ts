import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Simple AI responses for student assistance without external API
function generateResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Study plan requests
  if (lastMessage.includes('study plan') || lastMessage.includes('schedule')) {
    return `Here's a personalized study plan framework:

📅 Daily Study Schedule:
• Morning (9-11 AM): Focus on complex subjects when mind is fresh
• Afternoon (2-4 PM): Practice problems and review
• Evening (7-9 PM): Light reading and note review

📚 Weekly Structure:
• Monday-Friday: 2-3 hours focused study per day
• Weekend: Review and practice tests

✅ Tips:
• Use the Pomodoro Technique (25 min study, 5 min break)
• Prioritize difficult subjects early in the day
• Take one full day off per week
• Review notes within 24 hours of learning

Would you like me to customize this for specific subjects?`;
  }

  // Flashcard/quiz requests
  if (lastMessage.includes('flashcard') || lastMessage.includes('quiz') || lastMessage.includes('practice question')) {
    return `I'll help you create practice questions! Here are some examples:

1. What is the main purpose of mitochondria in cells?
Answer: Generate ATP energy through cellular respiration

2. Define the Pythagorean theorem
Answer: In a right triangle, a² + b² = c² where c is the hypotenuse

3. What year did World War II end?
Answer: 1945

4. Explain Newton's First Law of Motion
Answer: An object in motion stays in motion unless acted upon by an external force

5. What is the capital of France?
Answer: Paris

Want me to create questions for a specific topic? Just tell me the subject!`;
  }

  // Concept explanation requests
  if (lastMessage.includes('explain') || lastMessage.includes('what is') || lastMessage.includes('how does')) {
    return `I'd be happy to explain! To give you the best explanation:

🎯 Could you specify which concept you'd like me to explain? For example:
• Math: algebra, calculus, geometry concepts
• Science: biology, chemistry, physics principles
• History: events, periods, important figures
• Language: grammar rules, literary devices
• Computer Science: programming concepts, algorithms

I'll break it down step-by-step with examples to make it easy to understand!`;
  }

  // Homework help
  if (lastMessage.includes('homework') || lastMessage.includes('assignment') || lastMessage.includes('help with')) {
    return `I'm here to help with your homework! Here's how I can assist:

📝 I can help you:
• Break down complex problems into steps
• Explain concepts you're struggling with
• Review your work and provide feedback
• Suggest resources for further learning
• Create study guides for upcoming tests

⚠️ Remember: I'm here to guide you, not do the work for you! Learning happens when you work through problems yourself.

What subject or specific question do you need help with?`;
  }

  // Study tips for exams
  if (lastMessage.includes('exam') || lastMessage.includes('test') || lastMessage.includes('study tip')) {
    return `🎓 Essential Exam Study Tips:

Before the Exam:
• Start reviewing 1-2 weeks in advance
• Create a study schedule and stick to it
• Use active recall instead of passive reading
• Practice with past papers and sample questions
• Form study groups for discussion

The Night Before:
• Review key concepts and formulas
• Get 7-9 hours of sleep (crucial!)
• Prepare materials: pens, calculator, ID
• Avoid cramming - trust your preparation

During the Exam:
• Read all instructions carefully
• Answer easy questions first
• Manage your time wisely
• Check your work if time permits
• Stay calm and breathe

Need specific strategies for a particular subject?`;
  }

  // Time management
  if (lastMessage.includes('time management') || lastMessage.includes('procrastination') || lastMessage.includes('productivity')) {
    return `⏰ Time Management Strategies for Students:

🎯 Prioritization:
• Use Eisenhower Matrix: Urgent vs Important
• Tackle hardest tasks when energy is highest
• Break large projects into smaller tasks

📅 Planning:
• Use a planner or digital calendar
• Set specific, achievable daily goals
• Block time for specific subjects
• Include buffer time for unexpected tasks

💪 Beating Procrastination:
• Start with just 5 minutes on a task
• Remove distractions (phone, social media)
• Use website blockers during study time
• Reward yourself after completing tasks

⚡ Energy Management:
• Take regular breaks (Pomodoro Technique)
• Exercise and stay hydrated
• Maintain consistent sleep schedule
• Know your peak productivity hours

Try using the study timer on this app to track your focus time!`;
  }

  // Note-taking
  if (lastMessage.includes('note') || lastMessage.includes('taking notes')) {
    return `📝 Effective Note-Taking Methods:

Cornell Method:
• Divide page into 3 sections
• Notes | Keywords | Summary
• Review and fill in keywords later

Mind Mapping:
• Central topic in middle
• Branch out with related concepts
• Use colors and images
• Great for visual learners

Outline Method:
• Hierarchical structure
• Main topics, subtopics, details
• Easy to organize and review

Tips for Better Notes:
• Write in your own words
• Use abbreviations consistently
• Highlight key concepts
• Review and revise within 24 hours
• Add questions in margins

Would you like tips for digital vs handwritten notes?`;
  }

  // Motivation
  if (lastMessage.includes('motivat') || lastMessage.includes('give up') || lastMessage.includes('tired')) {
    return `💪 You've got this! Here's some motivation:

Remember Why You Started:
• Your goals and dreams matter
• Every study session is progress
• Small steps lead to big achievements

Quick Motivation Boosters:
• Take a 10-minute break and move around
• Call a friend for encouragement
• Review how far you've already come
• Visualize your success
• Change your study environment

"Success is the sum of small efforts repeated day in and day out."

It's okay to feel tired sometimes. What you're doing is challenging, and that's why it's worth it. Take care of yourself, and remember that rest is part of the process.

What subject are you working on? Let's tackle it together!`;
  }

  // Memory techniques
  if (lastMessage.includes('memory') || lastMessage.includes('remember') || lastMessage.includes('memorize')) {
    return `🧠 Memory Techniques That Work:

Mnemonics:
• Create acronyms (e.g., PEMDAS for math order)
• Make up memorable phrases
• Associate with familiar concepts

Spaced Repetition:
• Review material at increasing intervals
• Day 1, Day 3, Day 7, Day 14, Day 30
• Use flashcards (try the flashcard feature here!)

Active Recall:
• Test yourself without looking
• Explain concepts out loud
• Teach the material to someone else

Memory Palace:
• Associate facts with locations you know
• Visualize walking through the space
• Place information at specific spots

Visual Learning:
• Draw diagrams and charts
• Use color coding
• Create mental images

The key is practice and repetition. What topic do you need to memorize?`;
  }

  // Stress management
  if (lastMessage.includes('stress') || lastMessage.includes('anxiety') || lastMessage.includes('overwhelm')) {
    return `🌟 Managing Academic Stress:

Immediate Relief:
• Deep breathing: 4 seconds in, 7 hold, 8 out
• Take a short walk outside
• Listen to calming music
• Talk to a friend or family member

Long-term Strategies:
• Break work into manageable chunks
• Don't aim for perfection, aim for progress
• Maintain regular sleep schedule
• Exercise regularly (even 15 min helps)
• Practice mindfulness or meditation

Academic Balance:
• Schedule regular breaks
• Say no to over-committing
• Keep perspective - one grade doesn't define you
• Seek help when needed (tutors, counselors)

Remember: It's okay to ask for help. If stress becomes overwhelming, please reach out to a school counselor or trusted adult.

What specific situation is causing you stress?`;
  }

  // Reading comprehension
  if (lastMessage.includes('reading') || lastMessage.includes('comprehension') || lastMessage.includes('textbook')) {
    return `📖 Better Reading Comprehension:

SQ3R Method:
1. Survey - Skim headings and summaries
2. Question - Turn headings into questions
3. Read - Read actively for answers
4. Recite - Summarize in your own words
5. Review - Go back and review key points

Active Reading Strategies:
• Highlight sparingly (only key concepts)
• Write notes in margins
• Create questions as you read
• Summarize each section
• Connect to prior knowledge

Improving Speed & Retention:
• Eliminate subvocalization (reading aloud in head)
• Use a pointer to guide eyes
• Read in chunks, not word-by-word
• Take breaks every 25-30 minutes

Before Reading:
• Preview the material
• Set a purpose for reading
• Activate background knowledge

After Reading:
• Summarize main ideas
• Create flashcards for key terms
• Discuss with others

What are you currently reading that you need help with?`;
  }

  // Math help
  if (lastMessage.includes('math') || lastMessage.includes('algebra') || lastMessage.includes('calculus') || lastMessage.includes('geometry')) {
    return `🔢 Math Learning Strategies:

Problem-Solving Steps:
1. Read the problem carefully
2. Identify what's given and what's asked
3. Draw a diagram if helpful
4. Choose a strategy
5. Solve step by step
6. Check your answer

Study Tips:
• Practice regularly (daily is best)
• Work through examples before exercises
• Understand concepts, don't just memorize
• Review mistakes to learn from them
• Explain your reasoning out loud

When Stuck:
• Go back to basics/definitions
• Try a simpler similar problem
• Look for patterns
• Work backwards from the answer
• Take a break and return fresh

Resources:
• Khan Academy for video lessons
• Practice problems from textbook
• Study groups for discussion
• Online calculators to check work

What specific math topic or problem are you working on?`;
  }

  // Writing help
  if (lastMessage.includes('essay') || lastMessage.includes('writing') || lastMessage.includes('paper')) {
    return `✍️ Essay Writing Guide:

Planning (25% of time):
• Understand the prompt thoroughly
• Brainstorm ideas
• Create an outline
• Thesis statement: clear and specific

Structure:
• Introduction: Hook + Context + Thesis
• Body Paragraphs: Point + Evidence + Analysis
• Conclusion: Summarize + Broader significance

Writing (50% of time):
• Write freely in first draft
• One main idea per paragraph
• Use transition words
• Support claims with evidence
• Cite sources properly

Editing (25% of time):
• Take a break before editing
• Check for clarity and flow
• Eliminate unnecessary words
• Fix grammar and spelling
• Read aloud to catch errors

Tips:
• Start early to avoid rushing
• Get feedback from others
• Use active voice when possible
• Vary sentence structure

What type of writing assignment are you working on?`;
  }

  // Science help
  if (lastMessage.includes('science') || lastMessage.includes('biology') || lastMessage.includes('chemistry') || lastMessage.includes('physics')) {
    return `🔬 Science Study Strategies:

Understanding Concepts:
• Connect to real-world examples
• Draw diagrams and label them
• Explain processes in your own words
• Understand "why" not just "what"

Lab Work:
• Read procedures before class
• Take detailed observations
• Understand the purpose of each step
• Review safety protocols

Problem Solving:
• Identify knowns and unknowns
• Choose correct formulas
• Show all work
• Include units in answers

Study Techniques:
• Create concept maps
• Make comparison charts
• Use flashcards for terminology
• Watch video demonstrations
• Teach concepts to others

For Memorization:
• Use mnemonics for lists
• Group similar concepts
• Practice with diagrams
• Relate to everyday life

Which science subject do you need help with? I can provide more specific guidance!`;
  }

  // Language learning
  if (lastMessage.includes('language') || lastMessage.includes('vocabulary') || lastMessage.includes('grammar')) {
    return `🗣️ Language Learning Tips:

Vocabulary Building:
• Learn words in context, not isolation
• Use flashcards with sentences
• Practice spaced repetition
• Group words by theme
• Use new words in writing

Grammar Mastery:
• Understand rules through examples
• Practice with exercises
• Write your own sentences
• Notice patterns in reading
• Don't fear mistakes - learn from them

Speaking Practice:
• Read aloud daily
• Record yourself
• Practice with language partners
• Think in the target language
• Use language learning apps

Writing Skills:
• Start a journal in target language
• Get feedback on writing
• Mimic native writing styles
• Use grammar checkers
• Rewrite and improve

Reading Comprehension:
• Start with easier texts
• Don't translate every word
• Infer meaning from context
• Read diverse materials
• Summarize what you read

What language are you studying?`;
  }

  // Group study
  if (lastMessage.includes('group study') || lastMessage.includes('study group')) {
    return `👥 Effective Group Study Tips:

Setting Up:
• Keep groups small (3-5 people)
• Choose committed members
• Set clear goals for each session
• Pick a quiet location
• Agree on schedule and duration

During Sessions:
• Start with individual review (15 min)
• Share notes and perspectives
• Quiz each other
• Explain concepts to each other
• Work through problems together
• Take short breaks together

Roles That Help:
• Facilitator - keeps group on track
• Timekeeper - manages time
• Note-taker - records key points
• Question-asker - challenges understanding

Maximizing Benefits:
• Prepare beforehand individually
• Bring specific questions
• Respect different learning styles
• Stay focused on academics
• End with summary of what learned

Virtual Study Groups:
• Use video conferencing
• Share screens for collaboration
• Use digital whiteboards
• Record sessions (with permission)

When do you plan to start your study group?`;
  }

  // Default helpful response
  return `I'm here to help you with your studies! I can assist with:

📚 **Study Skills:**
• Creating study plans and schedules
• Time management and productivity
• Note-taking strategies
• Memory techniques

📝 **Subject Help:**
• Math, Science, English, History
• Essay writing and research
• Homework guidance
• Test preparation

💯 **Exam Success:**
• Study strategies for tests
• Practice questions and flashcards
• Review techniques
• Stress management

⏰ **Productivity:**
• Focus techniques (Pomodoro)
• Overcoming procrastination
• Staying motivated

What would you like to work on? Just tell me your subject, topic, or what you need help with!`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const response = generateResponse(messages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
