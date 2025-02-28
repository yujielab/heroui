'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Avatar,
  Button,
  Input,
} from '@heroui/react'; // 假设这些组件来自 heroui
import { AcmeIcon } from './acme'; // 假设这是你的自定义图标组件

function ChatApp() {
  // 状态用于存储对话历史
  const [messages, setMessages] = useState([]);
  // 状态用于管理加载状态
  const [input, setInput] = useState(''); // 用户输入状态
  const [isLoading, setIsLoading] = useState(false);
  // Ref 用于自动滚动到最新消息
  const chatWindowRef = useRef(null);

  // 处理发送消息的函数
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 将用户消息添加到对话中
    const userMessage = { type: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        // 将 AI 的响应添加到对话中
        const aiMessage = { type: 'assistant', content: data.reply, timestamp: new Date().toLocaleTimeString() };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // 如果 API 调用失败，添加错误消息
        setMessages((prev) => [...prev, { type: 'error', content: '获取响应失败', timestamp: new Date().toLocaleTimeString() }]);
      }
    } catch (error) {
      // 添加网络错误消息
      setMessages((prev) => [...prev, { type: 'error', content: '网络错误', timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      // 重置加载状态
      setIsLoading(false);
    }
  };

  // 当消息更新时自动滚动到最新消息
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        className="w-[480px] border-small border-foreground/10 bg-[url('https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/abstract-dark-bg4.jpg')] bg-right-bottom"
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar
              className="border-small border-white/20 bg-transparent"
              icon={<AcmeIcon className="text-white" />}
            />
            <p className="text-large font-medium text-white">AI 聊天助手</p>
          </div>
        </CardHeader>
        <CardBody className="px-3">
          <div
            ref={chatWindowRef}
            className="chat-window max-h-[400px] overflow-y-auto p-2 space-y-4 bg-black/10 rounded-lg"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    msg.type === 'user'
                      ? 'bg-white text-black'
                      : msg.type === 'assistant'
                      ? 'bg-white/80 text-black'
                      : 'bg-red-200 text-black'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-white/60">加载中...</div>
            )}
          </div>
        </CardBody>
        <CardFooter className="justify-between gap-2 p-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="border-small border-white/20 bg-white/10 text-white"
          >
            {isLoading ? '发送中...' : '发送'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChatApp;
