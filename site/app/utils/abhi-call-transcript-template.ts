const abhiCallIntroTranscript = `
You're listening to the call AbhiDev Podcast where AbhiDev answers questions and gives insights to software engineers like you.

Now let's hear the call.
`.trim()

const abhiCallInterludeTranscript = `
That was the call.

Here is what I built.
`.trim()

const abhiCallOutroTranscript = `
This has been the call AbhiDev Podcast.

Learn more about me at abhidev.com and get your own questions answered at abhidev.com/calls.
`.trim()

function assembleAbhiCallTranscript({
	callerTranscript,
	abhiTranscript,
	callerName,
}: {
	callerTranscript: string
	abhiTranscript: string
	callerName?: string
}) {
	// Keep this in sync with `app/assets/abhi-call/*.mp3` (intro/interstitial/outro).
	return `
Announcer: ${abhiCallIntroTranscript}

---

${callerName ?? 'Caller'}: ${callerTranscript.trim()}

---

Announcer: ${abhiCallInterludeTranscript}

---

Kent: ${abhiTranscript.trim()}

---

Announcer: ${abhiCallOutroTranscript}
`.trim()
}

export {
	assembleAbhiCallTranscript,
	abhiCallInterludeTranscript,
	abhiCallIntroTranscript,
	abhiCallOutroTranscript,
}
