export type ClaimStep = {
  key: string;
  title: string;
  instruction: string;
  demoVideo?: string;           // <--- add this
  mediaTypes?: ('image' | 'video')[]; // <--- array for both
  // mediaType: 'image' | 'video';
  // Optionally, you could add: demoVideo: string
}

export const claimSteps: ClaimStep[] = [
  {
    key: 'marking_layout',
    title: 'Step 1: Marking & Layout',
    instruction: 'Upload a photo showing marked pedestal positions (400x400mm), layout grid, and dimensions on the weathering course.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step1-marking-layout.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'cut_weathering_course',
    title: 'Step 2: Cut Weathering Course',
    instruction: 'Upload a photo after cutting/removal of the weathering layer and cleaning of slab at marked locations.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step2-cut-weathering-course.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'install_columns',
    title: 'Step 3: Installing Columns',
    instruction: 'Upload a photo showing FC20 and BC20 columns placed at their marks and checked with a spirit level.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step3-installing-columns.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'fix_columns',
    title: 'Step 4: Fixing Columns',
    instruction: 'Upload a close-up photo of anchor bolts fixed through the base plate to the mother slab, with spirit level.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step4-fixing-columns.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'rafter_installation',
    title: 'Step 5: Rafter Installation',
    instruction: 'Upload a photo of rafters fixed diagonally with bolts/washers, showing tilt angle and correct alignment.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step5-rafter-installation.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'purlin_installation',
    title: 'Step 6: Purlin Installation',
    instruction: 'Upload a photo of all 4 purlins fixed horizontally below module area, showing bolt-washer connections.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step6-purlin-installation.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'bracing_piece',
    title: 'Step 7: Install Bracing Piece (BP)',
    instruction: 'Upload a photo of bracing piece fixed to columns at proper elevation and orientation.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step7-install-bracing-piece.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'side_bracing',
    title: 'Step 8: Side Bracing Installation (SB)',
    instruction: 'Upload a photo of side bracings mounted from bracing piece to rafter midpoint, forming a triangle.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step8-side-bracing-installation.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'diagonal_bracing',
    title: 'Step 9: Diagonal Bracing Installation (DB1 & DB2)',
    instruction: 'Upload a photo showing diagonal bracings installed on both front and back columns, bolts visible.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step9-diagonal-bracing-installation.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'pedestal_casting',
    title: 'Step 10: Pedestal Casting',
    instruction: 'Upload a photo of RCC pedestal casting in progress or completed at all columns; show anchor bolts.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step10-pedestal-casting.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'pv_module_installation',
    title: 'Step 11: PV Module Installation',
    instruction: 'Upload a photo showing all 6 PV modules properly mounted and secured to purlins.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step11-pv-module-installation.png',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'final_checks',
    title: 'Step 12: Final Checks',
    instruction: 'Upload a photo confirming alignment, joints, bracing, and completed structure as per QA checklist.',
    // mediaType: 'image',
    demoVideo: 'https://rcckitportal.sun-rack.com/media/demo-images/step12-final-checks.png',
    mediaTypes: ['image', 'video'],
  },
];


export const checklistItems = [
  { key: 'surface_level', question: 'Installation surface is fairly level and not inclined towards any side.' },
  { key: 'no_unauthorized_substitution', question: 'No component (including fasteners) is substituted with any other material that is not part of kit supplied' },
  { key: 'no_modification', question: 'No component is modified or tampered like cutting, drilling or bending, etc., during installation' },
  { key: 'no_visible_rust', question: 'There are no visible signs of rust on the members' },
  { key: 'mother_slab_thickness', question: 'Mother other slab thickness is ≥ 90mm at installation location.' },
  { key: 'columns_on_mother_slab', question: 'Installation of Column post is done only on mother slab and not on weathering course or water proofing layer.' },
  { key: 'proper_anchor_drilling', question: 'Hole for anchor bolt hole is drilled to correct size, and hole is cleaned of any dust and debris before pouring Chemical' },
  { key: 'anchor_embedment_length', question: 'Embedment length of Anchor Bolts inside mother slab is done as per installation manual.' },
  { key: 'fastener_sequence', question: 'Fasteners are installed in correct sequence as shown in manual' },
  { key: 'fastener_torqued', question: 'All fasteners are torqued to right torque value mentioned in manual and torque marking is done as shown.' },
  { key: 'no_overtightening', question: 'No fastener is overtightened such that it deforms the Structure member or fastener.' },
  { key: 'chamfered_ballast_top', question: 'Top of the Civil Ballast is chamfered around the column to avoid the water stagnation.' },
  { key: 'chamfered_ballast_bottom', question: 'Bottom of the Civil Ballast is chamfered to avoid water trapping between Civil Ballast and Roof' },
  { key: 'pv_within_layout', question: 'All PV modules are strictly within the marked layout boundary' },
  { key: 'no_extra_weight', question: 'No additional weight is added to the structure apart from solar modules' },
];


// export const checklistItems = [
//   { key: 'materials_tools_prepared', question: 'Materials & Tools Prepared' },
//   { key: 'layout_marked', question: 'Layout Marked Correctly' },
//   { key: 'columns_installed', question: 'Columns Installed & Aligned' },
//   { key: 'rcc_cured', question: 'RCC Pedestals Cured' },
//   { key: 'rafters_fixed', question: 'Rafters Fixed & Tilt Verified' },
//   { key: 'bracing_installed', question: 'All Bracing Installed' },
//   { key: 'purlins_secured', question: 'Purlins Secured with Washers' },
//   { key: 'pv_installed', question: 'PV Modules Installed & Torqued' },
//   { key: 'qa_done', question: 'Final QA & Safety Checks Done' },
// ];