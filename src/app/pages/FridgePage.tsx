import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../../ui/page/PageHeader';
import Tabs from '../../ui/tabs/TabsComponent';
import ScannerTab from './Fridge/tabs/ScannerTab';
import FridgesTab from './Fridge/tabs/FridgesTab';
import RecipesTab from './Fridge/tabs/RecipesTab';
import PlanTab from './Fridge/tabs/PlanTab';
import ShoppingListTab from './Fridge/tabs/ShoppingListTab';

/**
 * FridgePage - Forge Culinaire
 * Page principale avec système d'onglets pour la gestion d'inventaire, recettes, plans et courses
 */
const FridgePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      <PageHeader
        icon="ChefHat"
        title="Forge Culinaire"
        subtitle="Recettes & Plans"
        circuit="fridge"
        iconColor="#EC4899"
      />

      <Tabs defaultValue="scanner" forgeContext="fridge">
        <Tabs.List role="tablist" aria-label="Forge Culinaire Navigation">
          <Tabs.Trigger value="scanner" icon="ScanLine">
            Scanner
          </Tabs.Trigger>
          <Tabs.Trigger value="inventaire" icon="Refrigerator">
            Inventaire
          </Tabs.Trigger>
          <Tabs.Trigger value="recipes" icon="ChefHat">
            Recettes
          </Tabs.Trigger>
          <Tabs.Trigger value="plan" icon="Calendar">
            Plan
          </Tabs.Trigger>
          <Tabs.Trigger value="courses" icon="ShoppingCart">
            Courses
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Panel value="scanner">
          <ScannerTab />
        </Tabs.Panel>

        <Tabs.Panel value="inventaire">
          <FridgesTab />
        </Tabs.Panel>

        <Tabs.Panel value="recipes">
          <RecipesTab />
        </Tabs.Panel>

        <Tabs.Panel value="plan">
          <PlanTab />
        </Tabs.Panel>

        <Tabs.Panel value="courses">
          <ShoppingListTab />
        </Tabs.Panel>
      </Tabs>
    </motion.div>
  );
};

export default FridgePage;
