/**
 * Coach Chat Interface
 * Main chat component for coach interaction
 * Combines MessagesDisplay with ChatInputBar for a complete chat experience
 */

import React, { useRef, useEffect, useState } from 'react';
import { useUnifiedCoachStore } from '../../../system/store/unifiedCoachStore';
import MessagesDisplay from './MessagesDisplay';
import ChatInputBar from './ChatInputBar';
import type { ExerciseAdjustmentCategory } from '../../../config/exerciseAdjustmentConfig';

interface CoachChatInterfaceProps {
  stepColor: string;
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  className?: string;
  messagesContainerRef?: React.RefObject<HTMLDivElement>;
  onScrollChange?: (showButton: boolean) => void;
  onExerciseClick?: (exerciseId: string, exerciseName: string) => void;
  onCategorySelect?: (category: ExerciseAdjustmentCategory) => void;
  onOptionSelect?: (optionId: string) => void;
  onValidate?: () => void;
  onModify?: () => void;
  onViewExercise?: () => void;
  onContinue?: () => void;
  onBack?: () => void;
}

const CoachChatInterface: React.FC<CoachChatInterfaceProps> = ({
  stepColor,
  onSendMessage,
  isTyping = false,
  className = '',
  messagesContainerRef,
  onScrollChange,
  onExerciseClick,
  onCategorySelect,
  onOptionSelect,
  onValidate,
  onModify,
  onViewExercise,
  onContinue,
  onBack
}) => {
  // Use UnifiedCoachStore with proper selectors
  const isRecording = useUnifiedCoachStore(state => state.isRecording);
  const isProcessing = useUnifiedCoachStore(state => state.isProcessing);
  const isSpeaking = useUnifiedCoachStore(state => state.isSpeaking);

  // Voice settings - default enabled for all modes
  const voiceSettings = { enabled: true };

  const handleStartRecording = () => {
    console.log('Start voice recording');
  };

  const handleStopRecording = () => {
    console.log('Stop voice recording');
  };

  return (
    <div className={`coach-chat-interface flex flex-col ${className}`} style={{ height: '100%', position: 'relative', minHeight: 0 }}>
      {/* Messages Display */}
      <MessagesDisplay
        stepColor={stepColor}
        isTyping={isTyping}
        messagesContainerRef={messagesContainerRef}
        onScrollChange={onScrollChange}
        onExerciseClick={onExerciseClick}
        onCategorySelect={onCategorySelect}
        onOptionSelect={onOptionSelect}
        onValidate={onValidate}
        onModify={onModify}
        onViewExercise={onViewExercise}
        onContinue={onContinue}
        onBack={onBack}
        onSendMessage={onSendMessage}
      />

      {/* Chat Input Bar - Fixed at bottom with minimal spacing */}
      <div className="chat-input-footer flex-shrink-0" style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '8px 8px 0px 8px'
      }}>
        <ChatInputBar
          onSendMessage={onSendMessage}
          onStartVoiceRecording={handleStartRecording}
          onStopVoiceRecording={handleStopRecording}
          isRecording={isRecording}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
          voiceEnabled={voiceSettings.enabled}
          stepColor={stepColor}
        />
      </div>
    </div>
  );
};

export default CoachChatInterface;
