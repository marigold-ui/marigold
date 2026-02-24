export const FeedbackComponentsTable = () => (
  <table
    aria-label="Feedback message components comparison"
    style={{ width: '100%' }}
  >
    <thead>
      <tr>
        <th>Component</th>
        <th>Relevant use case(s)</th>
        <th>Disruption level</th>
        <th>Persistence</th>
        <th>Dismissable by the user?</th>
        <th>Display</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dialog</td>
        <td>Interrupt the user to inform them of task-critical information</td>
        <td>High</td>
        <td>Permanent</td>
        <td>Yes (optional)</td>
        <td>Block</td>
        <td>
          Fixed as an overlay on top of the page, typically in the center of the
          viewport
        </td>
      </tr>
      <tr>
        <td>Input field validation</td>
        <td>Inform users of the status of form field inputs</td>
        <td>Medium</td>
        <td>Permanent</td>
        <td>No</td>
        <td>Inline</td>
        <td>Directly beneath the affected input field</td>
      </tr>
      <tr>
        <td>Section message</td>
        <td>
          Inform users of relevant information in one section/area of the screen
        </td>
        <td>Low</td>
        <td>Permanent</td>
        <td>Yes (optional)</td>
        <td>Block</td>
        <td>Visually near the affected content, typically directly above</td>
      </tr>
    </tbody>
  </table>
);
