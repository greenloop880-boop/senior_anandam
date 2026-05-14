import * as lucide from 'lucide-react';
const icons = ['ChevronRight', 'MapPin', 'FileText', 'Users', 'Utensils', 'TreePine', 'Calendar', 'HeartHandshake', 'ShieldCheck', 'Home', 'PawPrint', 'ArrowRight'];
icons.forEach(i => {
  if (!lucide[i]) {
    console.error(`Missing icon: ${i}`);
  }
});
console.log("Check complete.");
