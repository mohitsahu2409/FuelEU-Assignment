# AI Agent Workflow Log

## Agents Used

- ChatGPT (GPT-Go) — primary tool for development
- VS Code — coding environment
- Manual reasoning & validation

---

## Prompts & Outputs

### Example 1: Project Understanding & Architecture

**Prompt:**

> Explain the FuelEU Maritime assignment in depth so I can understand what I have to build.

**AI Output:**

- Broke down the system into:
  - Routes
  - Compliance Balance (CB)
  - Banking
  - Pooling

- Suggested Clean/Hexagonal Architecture

**Refinement:**

- Initially implemented basic structure
- Later refactored into:
  - `core / ports / adapters / infrastructure` (backend)
  - `UI → use-cases → API` (frontend)

---

### Example 2: Backend API Development

**Prompt:**

> Build GET /routes API using clean architecture step-by-step.

**AI Output:**

- Generated:
  - Controller
  - Use case
  - Repository interface
  - PostgreSQL adapter

**Refinement:**

- Fixed TypeScript interface mismatch errors
- Added missing methods like:
  - `setBaseline`
  - `getBaselineRoute`
  - `getRouteById`

- Ensured proper layering and data mapping

---

### Example 3: Debugging TypeScript Errors

**Prompt:**

> Property 'setBaseline' is missing in type 'RouteRepositoryPG'

**Issue:**

- Interface and implementation mismatch

**Fix Applied:**

```ts
async setBaseline(routeId: number): Promise<void> {
  await pool.query(
    "UPDATE routes SET is_baseline = true WHERE id = $1",
    [routeId]
  );
}
```

**Learning:**

- Importance of keeping ports and adapters aligned

---

### Example 4: Compliance Balance (CB) Logic

**Prompt:**

> Build compliance balance API step-by-step

**AI Output:**

- Formula:
  - CB = (Target − Actual) × Energy
  - Energy = fuel × 41000

**Refinement:**

- Verified manually using sample data
- Ensured:
  - Positive → surplus
  - Negative → deficit

---

### Example 5: Pooling Logic (Most Complex)

**Prompt:**

> Build pooling API step-by-step

**AI Output:**

- Basic redistribution idea

**Your Improvements:**

- Implemented greedy allocation
- Added constraints:
  - Total CB must remain ≥ 0
  - No ship becomes worse
  - Surplus cannot go negative

- Validated multiple scenarios manually

---

### Example 6: Frontend Development

**Prompt:**

> Build frontend using React + Tailwind step-by-step

**AI Output:**

- Created pages:
  - Routes
  - Compare
  - Banking
  - Pooling

**Refinement:**

- Added:
  - Styling improvements
  - Error handling
  - Conditional UI logic

- Later refactored to:
  - Hexagonal frontend architecture
  - Removed direct axios calls

---

### Example 7: Debugging & Setup Issues

**Prompts included:**

- pgAdmin / PostgreSQL setup issues
- Tailwind installation errors
- Vite + PostCSS errors
- Missing modules (cors, recharts)

**Fixes:**

- Installed correct dependencies
- Fixed config files
- Resolved version conflicts (TypeScript vs ts-jest)

---

### Example 8: Testing Setup

**Prompt:**

> Add unit tests and integration tests step-by-step

**AI Output:**

- Setup Jest + ts-jest
- Created:
  - Unit test (CB logic)
  - API test (`/routes`)

**Refinement:**

- Fixed:
  - Path issues
  - Wrong test imports (`node:test` → Jest)
  - Open handle warning (closed DB pool)

---

## Validation / Corrections

- Tested APIs using Thunder Client

- Verified CB calculations manually

- Tested edge cases:
  - Banking deficit route
  - Applying more than available bank
  - Invalid pooling combinations

- Fixed:
  - Floating point precision issues
  - Incorrect API responses
  - UI error handling

---

## Observations

### Where AI Helped

- Generated most of the boilerplate code
- Helped design backend architecture
- Assisted in debugging TypeScript and runtime errors
- Suggested initial logic for pooling and banking
- Accelerated frontend development significantly

---

### Where AI Needed Correction

- Initial code did not strictly follow hexagonal architecture
- Some business logic required manual validation
- Pooling logic needed refinement beyond AI suggestions
- Error handling and edge cases required manual improvements

---

### Human Role

- Verified correctness of logic
- Refactored architecture
- Handled edge cases
- Ensured alignment with assignment requirements

---

## Best Practices Followed

- Implemented Hexagonal Architecture
- Separated concerns across layers
- Avoided direct API calls in UI
- Used TypeScript for type safety
- Added unit and integration tests
- Implemented proper error handling

---

## Final Takeaway

ChatGPT (GPT-Go) was used as the primary development assistant for generating code, debugging, and guiding implementation. However, the final correctness, architecture decisions, and edge-case handling required manual reasoning and validation.

> AI accelerated development significantly, but correctness depended on understanding and refining its output.
