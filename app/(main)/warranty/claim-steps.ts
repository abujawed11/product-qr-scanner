export type ClaimStep = {
  key: string;
  title: string;
  instruction: string;
  mediaType: 'image' | 'video';
  // Optionally, you could add: demoVideo: string
}

export const claimSteps: ClaimStep[] = [
  {
    key: 'marking_layout',
    title: 'Step 1: Marking & Layout',
    instruction: 'Upload a photo showing marked pedestal positions (400x400mm), layout grid, and dimensions on the weathering course.',
    mediaType: 'image',
  },
  {
    key: 'cut_weathering_course',
    title: 'Step 2: Cut Weathering Course',
    instruction: 'Upload a photo after cutting/removal of the weathering layer and cleaning of slab at marked locations.',
    mediaType: 'image',
  },
  {
    key: 'install_columns',
    title: 'Step 3: Installing Columns',
    instruction: 'Upload a photo showing FC20 and BC20 columns placed at their marks and checked with a spirit level.',
    mediaType: 'image',
  },
  {
    key: 'fix_columns',
    title: 'Step 4: Fixing Columns',
    instruction: 'Upload a close-up photo of anchor bolts fixed through the base plate to the mother slab, with spirit level.',
    mediaType: 'image',
  },
  {
    key: 'rafter_installation',
    title: 'Step 5: Rafter Installation',
    instruction: 'Upload a photo of rafters fixed diagonally with bolts/washers, showing tilt angle and correct alignment.',
    mediaType: 'image',
  },
  {
    key: 'purlin_installation',
    title: 'Step 6: Purlin Installation',
    instruction: 'Upload a photo of all 4 purlins fixed horizontally below module area, showing bolt-washer connections.',
    mediaType: 'image',
  },
  {
    key: 'bracing_piece',
    title: 'Step 7: Install Bracing Piece (BP)',
    instruction: 'Upload a photo of bracing piece fixed to columns at proper elevation and orientation.',
    mediaType: 'image',
  },
  {
    key: 'side_bracing',
    title: 'Step 8: Side Bracing Installation (SB)',
    instruction: 'Upload a photo of side bracings mounted from bracing piece to rafter midpoint, forming a triangle.',
    mediaType: 'image',
  },
  {
    key: 'diagonal_bracing',
    title: 'Step 9: Diagonal Bracing Installation (DB1 & DB2)',
    instruction: 'Upload a photo showing diagonal bracings installed on both front and back columns, bolts visible.',
    mediaType: 'image',
  },
  {
    key: 'pedestal_casting',
    title: 'Step 10: Pedestal Casting',
    instruction: 'Upload a photo of RCC pedestal casting in progress or completed at all columns; show anchor bolts.',
    mediaType: 'image',
  },
  {
    key: 'pv_module_installation',
    title: 'Step 11: PV Module Installation',
    instruction: 'Upload a photo showing all 6 PV modules properly mounted and secured to purlins.',
    mediaType: 'image',
  },
  {
    key: 'final_checks',
    title: 'Step 12: Final Checks',
    instruction: 'Upload a photo confirming alignment, joints, bracing, and completed structure as per QA checklist.',
    mediaType: 'image',
  },
];
