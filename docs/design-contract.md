# Cambridge Path — design contract

- Product surface: authenticated-feeling local learning workspace (no real authentication in this MVP).
- User job: see today's plan, finish a lesson, practise exam tasks, review vocabulary, understand progress.
- Primary action: continue the current lesson.
- Hierarchy: today's target → current lesson → lesson queue → weekly feedback.
- Audience: Vietnamese learners preparing for Cambridge English qualifications from A1 to C2.
- Direction: calm academic desk; deep ink green, warm paper and amber annotation details.
- Memorable detail: paper-and-ink grammar composition within the active lesson panel.
- Viewports: 390x844 and 1440x900.
- Accessibility: keyboard focus, semantic controls, labelled icon actions, reduced-motion support, AA-oriented contrast.
- Performance: no image payloads or runtime data requests; local state only.

## Content states

- Loading: not applicable because this local MVP makes no asynchronous data requests.
- Empty: new learners receive a complete starter plan after onboarding.
- Error: not applicable because this local MVP makes no fallible remote request.
- Partial: lesson completion can be partial and is shown as a progress bar.
- Success: completion produces a visible toast, XP update and completed state.
- Permission: not applicable because the MVP does not request protected device or account access.
