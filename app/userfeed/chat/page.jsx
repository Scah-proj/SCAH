"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import {
  ArrowLeft,
  CheckCheck,
  ImagePlus,
  Info,
  MessageCircle,
  MoreHorizontal,
  Phone,
  X,
  Search,
  Send,
  SlidersHorizontal,
  Smile,
  Sparkles,
  Video,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useGetMutualsQuery } from "../../redux/api/connectionApi";

const avatarColors = [
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
];

const chatEmojis = [
  { emoji: "😀", label: "Grinning face" },
  { emoji: "😂", label: "Face with tears of joy" },
  { emoji: "🥹", label: "Face holding back tears" },
  { emoji: "😍", label: "Heart eyes" },
  { emoji: "😎", label: "Smiling face with sunglasses" },
  { emoji: "🤔", label: "Thinking face" },
  { emoji: "👏", label: "Clapping hands" },
  { emoji: "🙌", label: "Raising hands" },
  { emoji: "🙏", label: "Folded hands" },
  { emoji: "💪", label: "Flexed biceps" },
  { emoji: "❤️", label: "Red heart" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "⭐", label: "Star" },
  { emoji: "🎉", label: "Party popper" },
  { emoji: "⚽", label: "Soccer ball" },
  { emoji: "🏀", label: "Basketball" },
  { emoji: "🏈", label: "American football" },
  { emoji: "⚾", label: "Baseball" },
  { emoji: "🏐", label: "Volleyball" },
  { emoji: "🎾", label: "Tennis" },
  { emoji: "🥇", label: "Gold medal" },
  { emoji: "🏆", label: "Trophy" },
  { emoji: "🚀", label: "Rocket" },
  { emoji: "💯", label: "Hundred points" },
];

const apiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("The API URL is not configured.");
  return baseUrl.replace(/\/+$/, "");
};

const unwrap = (response) => response?.data ?? response;

async function requestChat(path, token, { method = "GET", body } = {}) {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const response = await fetch(`${apiBaseUrl()}/api/chat${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
    },
    ...(body
      ? { body: isFormData ? body : JSON.stringify(body) }
      : {}),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error?.message ||
        data?.error ||
        data?.errors?.[0]?.message ||
        "We couldn’t complete that chat request.",
    );
  }
  return unwrap(data);
}

const getEntityId = (entity) => {
  if (!entity) return "";
  if (typeof entity === "string") return entity;
  return String(entity._id ?? entity.id ?? entity.userId ?? "");
};

const getPerson = (participant) => {
  if (!participant || typeof participant === "string") return {};
  return participant.user ?? participant.profile ?? participant;
};

const personName = (person) =>
  person.name ||
  `${person.firstName ?? ""} ${person.lastName ?? ""}`.trim() ||
  person.username ||
  person.fullName ||
  "";

const makeInitials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";

const formatTime = (date) => {
  if (!date) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  const now = new Date();
  if (value.toDateString() === now.toDateString()) {
    return value.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
  return value.toLocaleDateString([], { month: "short", day: "numeric" });
};

function normalizeConversation(raw, currentUserId, index = 0) {
  const conversation = raw?.conversation ?? raw;
  if (!conversation || typeof conversation !== "object") return null;

  const participants = Array.isArray(conversation.participants)
    ? conversation.participants
    : [];
  const otherParticipant =
    participants.find((participant) => {
      const id = getEntityId(participant?.user ?? participant);
      return !currentUserId || id !== currentUserId;
    }) ?? participants[0];
  const person = getPerson(otherParticipant);
  const name = personName(person) || conversation.name || "Conversation";
  const picture =
    person.picture ||
    person.profilePicture ||
    person.avatar ||
    person.image ||
    person.photo ||
    "";
  const lastMessage =
    conversation.lastMessage?.message ?? conversation.lastMessage ?? null;
  const unreadCount = Number(
    conversation.unreadCount ?? conversation.unread ?? 0,
  );

  return {
    ...conversation,
    id: getEntityId(conversation) || conversation.conversationId,
    name,
    profileId: getEntityId(otherParticipant?.user ?? otherParticipant),
    role:
      person.role ||
      person.occupation ||
      person.location ||
      (participants.length > 2 ? `${participants.length} members` : ""),
    initials: makeInitials(name),
    picture,
    color: avatarColors[index % avatarColors.length],
    online: Boolean(person.online || person.isOnline),
    unreadCount: Number.isFinite(unreadCount) ? unreadCount : 0,
    preview:
      typeof lastMessage === "string"
        ? lastMessage
        : messagePreview(lastMessage),
    time: formatTime(conversation.updatedAt ?? lastMessage?.createdAt),
    lastMessage,
    participants,
    raw: conversation,
  };
}

const conversationIdFrom = (conversation) =>
  conversation?.id ||
  getEntityId(conversation) ||
  conversation?.conversationId ||
  "";

const extractConversations = (response) => {
  const value = unwrap(response);
  const list =
    value?.conversations ??
    value?.chats ??
    value?.data?.conversations ??
    value?.data?.chats ??
    value?.data ??
    value;
  if (!Array.isArray(list)) {
    throw new Error("The chat service returned an invalid conversation list.");
  }
  return list;
};

const extractMessages = (response) => {
  const value = unwrap(response);
  const list = value?.messages ?? value?.data?.messages ?? value?.data ?? value;
  if (!Array.isArray(list)) {
    throw new Error("The chat service returned an invalid message list.");
  }
  return list;
};

const extractMessage = (response) => {
  const value = unwrap(response);
  return value?.message ?? value?.data?.message ?? value?.data ?? value;
};

const extractConversation = (response) => {
  const value = unwrap(response);
  return value?.conversation ?? value?.data?.conversation ?? null;
};

const messageId = (message) =>
  String(message?._id ?? message?.id ?? message?.messageId ?? "");

const messageAttachments = (message) =>
  Array.isArray(message?.attachments) ? message.attachments : [];

const messagePreview = (message) =>
  message?.content?.trim() ||
  (messageAttachments(message).length
    ? messageAttachments(message).length === 1
      ? "📷 Image"
      : `📷 ${messageAttachments(message).length} images`
    : "Start a conversation");

const appendUniqueMessage = (thread, incomingMessage) => {
  const incomingId = messageId(incomingMessage);
  if (
    (incomingId && thread.some((item) => messageId(item) === incomingId)) ||
    thread.some(
      (item) =>
        item.content === incomingMessage.content &&
        item.createdAt === incomingMessage.createdAt &&
        getEntityId(item.sender) === getEntityId(incomingMessage.sender) &&
        messageAttachments(item).length ===
          messageAttachments(incomingMessage).length,
    )
  ) {
    return thread;
  }
  return [...thread, incomingMessage];
};

function Avatar({ conversation, size = "md" }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [conversation.picture]);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full font-semibold ${
        size === "lg" ? "h-12 w-12 text-sm" : "h-11 w-11 text-xs"
      } ${conversation.color}`}
      role="img"
      aria-label={`${conversation.name} profile picture`}
    >
      {conversation.picture && !imageFailed ? (
        <img
          src={conversation.picture}
          alt=""
          className="h-full w-full rounded-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        conversation.initials
      )}
      {conversation.online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
      )}
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const currentUserId = getEntityId(user);
  const [requestedRecipient, setRequestedRecipient] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeId, setActiveId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [joinedConversationId, setJoinedConversationId] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const socketRef = useRef(null);
  const activeIdRef = useRef(activeId);
  const messagesRef = useRef(messages);
  const typingStartedConversationRef = useRef("");
  const typingStopTimeoutRef = useRef(null);
  const remoteTypingTimeoutRef = useRef(null);
  const imageInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const selectedImagesRef = useRef(selectedImages);
  const messagesContainerRef = useRef(null);
  const loadConversationsRef = useRef(() => {});
  const loadMessagesRef = useRef(() => {});
  const initialRecipientHandledRef = useRef(false);
  const token = authToken || (typeof window !== "undefined" && localStorage.getItem("token"));
  const { data: mutualsData, isLoading: loadingMutuals, error: mutualsError } =
    useGetMutualsQuery(undefined, {
      skip: !showContacts,
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipientId = params.get("recipientId");
    if (!recipientId) return;

    setRequestedRecipient({
      _id: recipientId,
      name: params.get("name") || "SCAH member",
      picture: params.get("picture") || "",
    });
  }, []);

  messagesRef.current = messages;
  selectedImagesRef.current = selectedImages;

  useEffect(
    () => () => {
      selectedImagesRef.current.forEach((image) =>
        URL.revokeObjectURL(image.preview),
      );
    },
    [],
  );

  const loadConversations = useCallback(async () => {
    if (!token) {
      setLoadingConversations(false);
      setChatError("Please sign in again to access your messages.");
      return [];
    }

    setLoadingConversations(true);
    try {
      const response = await requestChat("", token);
      const nextConversations = extractConversations(response)
        .map((conversation, index) =>
          normalizeConversation(conversation, currentUserId, index),
        )
        .filter((conversation) => conversation?.id);
      setConversations(nextConversations);
      setChatError("");
      return nextConversations;
    } catch (error) {
      setChatError(error.message || "We couldn’t load your conversations.");
      return [];
    } finally {
      setLoadingConversations(false);
    }
  }, [currentUserId, token]);

  const loadMessages = useCallback(
    async (conversationId) => {
      if (!token || !conversationId) return;
      setLoadingMessages(true);
      try {
        const response = await requestChat(
          `/${encodeURIComponent(conversationId)}`,
          token,
        );
        setMessages((current) => ({
          ...current,
          [conversationId]: extractMessages(response),
        }));
        setChatError("");
      } catch (error) {
        setChatError(error.message || "We couldn’t load this conversation.");
      } finally {
        setLoadingMessages(false);
      }
    },
    [token],
  );

  useEffect(() => {
    loadConversationsRef.current = loadConversations;
  }, [loadConversations]);

  useEffect(() => {
    loadMessagesRef.current = loadMessages;
  }, [loadMessages]);

  const stopTyping = useCallback((conversationId = typingStartedConversationRef.current) => {
    if (typingStopTimeoutRef.current) {
      clearTimeout(typingStopTimeoutRef.current);
      typingStopTimeoutRef.current = null;
    }
    if (
      conversationId &&
      typingStartedConversationRef.current === conversationId
    ) {
      if (socketRef.current?.connected) {
        socketRef.current.emit("typing_stop", { conversationId });
      }
      typingStartedConversationRef.current = "";
    }
  }, []);

  const updateMessage = (value) => {
    setMessage(value);
    const conversationId = activeIdRef.current;
    const conversation = conversations.find((item) => item.id === conversationId);
    if (
      !value.trim() ||
      !conversationId ||
      conversation?.isDraft ||
      !socketRef.current?.connected
    ) {
      stopTyping(conversationId);
      return;
    }

    if (typingStartedConversationRef.current !== conversationId) {
      stopTyping();
      socketRef.current.emit("typing_start", { conversationId });
      typingStartedConversationRef.current = conversationId;
    }
    if (typingStopTimeoutRef.current) {
      clearTimeout(typingStopTimeoutRef.current);
    }
    typingStopTimeoutRef.current = setTimeout(
      () => stopTyping(conversationId),
      1200,
    );
  };

  const handleMessageChange = (event) => {
    updateMessage(event.target.value);
  };

  const insertEmoji = (emoji) => {
    const input = messageInputRef.current;
    const start = input?.selectionStart ?? message.length;
    const end = input?.selectionEnd ?? start;
    const nextMessage =
      message.slice(0, start) + emoji + message.slice(end);
    updateMessage(nextMessage);
    setShowEmojiPicker(false);
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  useEffect(() => {
    let socket;
    let isMounted = true;

    loadConversations();

    if (!token) return () => {};

    try {
      socket = io(apiBaseUrl(), {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 10000,
      });
    } catch (error) {
      setChatError(error.message || "We couldn’t connect to chat.");
      return () => {};
    }

    socketRef.current = socket;
    const onConnect = () => {
      if (!isMounted) return;
      setSocketConnected(true);
      setChatError("");
      loadConversationsRef.current();
      const currentConversationId = activeIdRef.current;
      if (currentConversationId) {
        socket.emit("join_conversation", {
          conversationId: currentConversationId,
        });
        loadMessagesRef.current(currentConversationId);
      }
    };
    const onDisconnect = () => {
      if (!isMounted) return;
      setSocketConnected(false);
      setJoinedConversationId("");
      setTypingUser(null);
      typingStartedConversationRef.current = "";
      if (typingStopTimeoutRef.current) {
        clearTimeout(typingStopTimeoutRef.current);
        typingStopTimeoutRef.current = null;
      }
      if (remoteTypingTimeoutRef.current) {
        clearTimeout(remoteTypingTimeoutRef.current);
        remoteTypingTimeoutRef.current = null;
      }
    };
    const onTypingStarted = ({ conversationId, user: sender } = {}) => {
      if (
        !conversationId ||
        conversationId !== activeIdRef.current ||
        getEntityId(sender) === currentUserId
      ) {
        return;
      }
      setTypingUser(sender || { name: "Someone" });
      if (remoteTypingTimeoutRef.current) {
        clearTimeout(remoteTypingTimeoutRef.current);
      }
      remoteTypingTimeoutRef.current = setTimeout(() => {
        setTypingUser(null);
        remoteTypingTimeoutRef.current = null;
      }, 5000);
    };
    const onTypingStopped = ({ conversationId, userId } = {}) => {
      if (conversationId !== activeIdRef.current) return;
      setTypingUser((current) =>
        !userId || getEntityId(current) === userId ? null : current,
      );
      if (remoteTypingTimeoutRef.current) {
        clearTimeout(remoteTypingTimeoutRef.current);
        remoteTypingTimeoutRef.current = null;
      }
    };
    const onNewMessage = ({ conversationId, message: incomingMessage } = {}) => {
      if (!conversationId || !incomingMessage) return;
      setMessages((current) => {
        const thread = current[conversationId] ?? [];
        const incomingId = messageId(incomingMessage);
        if (incomingId && thread.some((item) => messageId(item) === incomingId)) {
          return current;
        }
        const senderId = getEntityId(incomingMessage.sender);
        const isMine = Boolean(currentUserId && senderId === currentUserId);
        const optimisticIndex = thread.findIndex(
          (item) =>
            item.pending &&
            item.content === incomingMessage.content &&
            isMine,
        );
        const updatedThread = [...thread];
        if (optimisticIndex >= 0) updatedThread.splice(optimisticIndex, 1);
        return {
          ...current,
          [conversationId]: appendUniqueMessage(updatedThread, {
            ...incomingMessage,
            mine: isMine,
          }),
        };
      });
      setConversations((current) => {
        const existing = current.find(
          (conversation) => conversation.id === conversationId,
        );
        const lastMessage = incomingMessage;
        const updated = existing
          ? {
              ...existing,
              lastMessage,
              preview: messagePreview(incomingMessage),
              time: formatTime(incomingMessage.createdAt) || "Now",
              updatedAt: incomingMessage.createdAt || new Date().toISOString(),
            }
          : normalizeConversation(
              { _id: conversationId, lastMessage, updatedAt: incomingMessage.createdAt },
              currentUserId,
              current.length,
            );
        return [
          updated,
          ...current.filter((conversation) => conversation.id !== conversationId),
        ].filter(Boolean);
      });
    };
    const onConversationUpdated = ({
      conversationId,
      conversation,
      unreadCount,
    } = {}) => {
      if (!conversationId) return;
      setConversations((current) => {
        const existing = current.find((item) => item.id === conversationId);
        const rawConversation = {
          ...(existing?.raw ?? {}),
          ...(conversation ?? {}),
          _id: conversation?.id ?? conversation?._id ?? conversationId,
          unreadCount: unreadCount ?? conversation?.unreadCount ?? existing?.unreadCount ?? 0,
        };
        const normalized = normalizeConversation(
          rawConversation,
          currentUserId,
          existing ? current.indexOf(existing) : current.length,
        );
        if (!normalized?.id) return current;
        return [
          normalized,
          ...current.filter((item) => item.id !== conversationId),
        ];
      });
    };
    const markOwnMessagesRead = (conversationId) => {
      if (!conversationId) return;
      setMessages((current) => ({
        ...current,
        [conversationId]: (current[conversationId] ?? []).map((item) =>
          currentUserId && getEntityId(item.sender) === currentUserId
            ? { ...item, read: true, readAt: item.readAt || new Date().toISOString() }
            : item,
        ),
      }));
    };
    const onMessagesRead = ({ conversationId } = {}) =>
      markOwnMessagesRead(conversationId);
    const onConversationRead = ({ conversationId } = {}) =>
      markOwnMessagesRead(conversationId);
    const onChatError = ({ message: errorMessage } = {}) => {
      const conversationId = activeIdRef.current;
      const failedMessage =
        [...(messagesRef.current[conversationId] ?? [])]
          .reverse()
          .find((item) => item.pending)?.content || "";
      setMessages((current) => {
        const thread = current[conversationId] ?? [];
        return {
          ...current,
          [conversationId]: thread.filter((item) => !item.pending),
        };
      });
      if (failedMessage) setMessage((current) => current || failedMessage);
      setChatError(errorMessage || "Something went wrong with chat. Please try again.");
    };
    const onJoinedConversation = ({ conversationId } = {}) => {
      setJoinedConversationId(conversationId || "");
    };
    const onLeftConversation = ({ conversationId } = {}) => {
      setJoinedConversationId((current) =>
        current === conversationId ? "" : current,
      );
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new_message", onNewMessage);
    socket.on("conversation_updated", onConversationUpdated);
    socket.on("messages_read", onMessagesRead);
    socket.on("conversation_read", onConversationRead);
    socket.on("chat_error", onChatError);
    socket.on("joined_conversation", onJoinedConversation);
    socket.on("left_conversation", onLeftConversation);
    socket.on("typing_started", onTypingStarted);
    socket.on("typing_stopped", onTypingStopped);
    socket.on("connect_error", () => {
      if (isMounted) setSocketConnected(false);
    });

    return () => {
      isMounted = false;
      stopTyping();
      if (socket.connected && activeIdRef.current) {
        socket.emit("leave_conversation", {
          conversationId: activeIdRef.current,
        });
      }
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new_message", onNewMessage);
      socket.off("conversation_updated", onConversationUpdated);
      socket.off("messages_read", onMessagesRead);
      socket.off("conversation_read", onConversationRead);
      socket.off("chat_error", onChatError);
      socket.off("joined_conversation", onJoinedConversation);
      socket.off("left_conversation", onLeftConversation);
      socket.off("typing_started", onTypingStarted);
      socket.off("typing_stopped", onTypingStopped);
      if (remoteTypingTimeoutRef.current) {
        clearTimeout(remoteTypingTimeoutRef.current);
        remoteTypingTimeoutRef.current = null;
      }
      socket.disconnect();
      if (socketRef.current === socket) socketRef.current = null;
    };
  }, [currentUserId, loadConversations, stopTyping, token]);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
  );

  const markConversationRead = useCallback(
    async (conversationId) => {
      if (!conversationId || !token) return;
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unreadCount: 0 }
            : conversation,
        ),
      );
      if (socketRef.current?.connected) {
        socketRef.current.emit("mark_conversation_read", { conversationId });
        return;
      }
      try {
        await requestChat(`/${encodeURIComponent(conversationId)}/read`, token, {
          method: "PATCH",
        });
      } catch (error) {
        setChatError(error.message || "We couldn’t mark messages as read.");
      }
    },
    [token],
  );

  const selectConversation = useCallback(
    (conversationId) => {
      if (!conversationId) return;
      const selectedConversation = conversations.find(
        (conversation) => conversation.id === conversationId,
      );
      const previousId = activeIdRef.current;
      if (previousId && previousId !== conversationId) {
        stopTyping(previousId);
        setTypingUser(null);
        if (remoteTypingTimeoutRef.current) {
          clearTimeout(remoteTypingTimeoutRef.current);
          remoteTypingTimeoutRef.current = null;
        }
      }
      if (
        previousId &&
        previousId !== conversationId &&
        !previousId.startsWith("draft-") &&
        socketRef.current?.connected
      ) {
        socketRef.current.emit("leave_conversation", {
          conversationId: previousId,
        });
      }
      activeIdRef.current = conversationId;
      setActiveId(conversationId);
      setShowContacts(false);
      setChatError("");
      if (!selectedConversation?.isDraft && socketRef.current?.connected) {
        socketRef.current.emit("join_conversation", { conversationId });
      }
      if (!selectedConversation?.isDraft) {
        loadMessages(conversationId);
        markConversationRead(conversationId);
      }
    },
    [conversations, loadMessages, markConversationRead, stopTyping],
  );

  const mutuals = useMemo(() => {
    const response = unwrap(mutualsData);
    const list =
      response?.mutuals ??
      response?.users ??
      response?.data?.mutuals ??
      response?.data?.users ??
      response?.data ??
      response;
    return Array.isArray(list) ? list : [];
  }, [mutualsData]);

  const visibleConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return conversations.filter((conversation) => {
      const matchesSearch =
        !query ||
        conversation.name.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query);
      return (
        matchesSearch &&
        (filter !== "unread" || conversation.unreadCount > 0)
      );
    });
  }, [conversations, filter, search]);

  const visibleMutuals = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mutuals.filter((person) =>
      personName(getPerson(person)).toLowerCase().includes(query),
    );
  }, [mutuals, search]);

  const startConversation = async (contact) => {
    const recipientId = getEntityId(contact?.user ?? contact);
    if (!recipientId) {
      setChatError("We couldn’t identify this person’s account.");
      return;
    }
    const existing = conversations.find((conversation) =>
      conversation.participants.some(
        (participant) =>
          getEntityId(participant?.user ?? participant) === recipientId,
      ),
    );
    if (existing) {
      selectConversation(existing.id);
      return;
    }
    const person = getPerson(contact);
    const name = personName(person) || "SCAH member";
    const draft = {
      id: `draft-${recipientId}`,
      name,
      profileId: recipientId,
      role: person.role || person.occupation || person.location || "",
      initials: makeInitials(name),
      picture:
        person.picture ||
        person.profilePicture ||
        person.avatar ||
        person.image ||
        person.photo ||
        "",
      color: avatarColors[conversations.length % avatarColors.length],
      online: Boolean(person.online || person.isOnline),
      unreadCount: 0,
      preview: "Start a conversation",
      time: "",
      participants: [user, contact?.user ?? contact].filter(Boolean),
      recipientId,
      isDraft: true,
    };
    setConversations((current) => [
      draft,
      ...current.filter((item) => item.id !== draft.id),
    ]);
    setMessages((current) => ({ ...current, [draft.id]: [] }));
    setShowContacts(false);
    setChatError("");
    activeIdRef.current = draft.id;
    setActiveId(draft.id);
  };

  useEffect(() => {
    if (
      !requestedRecipient ||
      loadingConversations ||
      initialRecipientHandledRef.current
    ) {
      return;
    }

    initialRecipientHandledRef.current = true;
    startConversation(requestedRecipient);
    setRequestedRecipient(null);
    router.replace("/userfeed/chat", { scroll: false });
  }, [conversations, loadingConversations, requestedRecipient, router]);

  const handleImageSelection = (event) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    if (selectedImages.length + files.length > 5) {
      setChatError("You can attach up to 5 images per message.");
      return;
    }

    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ]);
    const invalidType = files.find((file) => !allowedTypes.has(file.type));
    if (invalidType) {
      setChatError("Choose JPEG, PNG, GIF, or WebP images only.");
      return;
    }

    const oversizedFile = files.find((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFile) {
      setChatError(`${oversizedFile.name} is larger than the 10 MB limit.`);
      return;
    }

    const newImages = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((current) => [...current, ...newImages]);
    setChatError("");
  };

  const removeSelectedImage = (imageId) => {
    setSelectedImages((current) => {
      const removedImage = current.find((image) => image.id === imageId);
      if (removedImage) URL.revokeObjectURL(removedImage.preview);
      return current.filter((image) => image.id !== imageId);
    });
    setChatError("");
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = message.trim();
    const imagesToSend = selectedImages;
    if (
      (!content && !imagesToSend.length) ||
      !activeConversation ||
      !token ||
      isSendingMessage
    ) {
      return;
    }
    stopTyping(activeConversation.id);

    const conversationId = activeConversation.id;
    const recipient = activeConversation.participants.find(
      (participant) =>
        getEntityId(participant?.user ?? participant) !== currentUserId,
    );
    const recipientId =
      activeConversation.recipientId || getEntityId(recipient?.user ?? recipient);
    setChatError("");

    if (
      activeConversation.isDraft ||
      imagesToSend.length > 0 ||
      !socketRef.current?.connected
    ) {
      setIsSendingMessage(true);
      try {
        let body;
        if (imagesToSend.length) {
          body = new FormData();
          if (activeConversation.isDraft) {
            body.append("recipientId", recipientId);
          } else {
            body.append("conversationId", conversationId);
          }
          if (content) body.append("content", content);
          imagesToSend.forEach(({ file }) => body.append("images", file));
        } else {
          body = {
            ...(activeConversation.isDraft
              ? { recipientId }
              : { conversationId }),
            content,
          };
        }

        const response = await requestChat("", token, {
          method: "POST",
          body,
        });
        const sentMessage = extractMessage(response);
        const rawConversation = extractConversation(response);
        let persistedId = activeConversation.isDraft
          ? getEntityId(rawConversation) ||
            rawConversation?.conversationId ||
            getEntityId(sentMessage?.conversationId) ||
            sentMessage?.conversationId
          : conversationId;

        let normalized = rawConversation
          ? normalizeConversation(rawConversation, currentUserId, 0)
          : null;

        if (!persistedId) {
          const latestConversations = await loadConversations();
          const matchingConversation = latestConversations.find((conversation) =>
            conversation.participants.some(
              (participant) =>
                getEntityId(participant?.user ?? participant) === recipientId,
            ),
          );
          persistedId = matchingConversation?.id;
          normalized = matchingConversation || null;
        }

        if (!persistedId) {
          throw new Error(
            "The message was accepted, but its conversation could not be identified. Refresh your messages to continue.",
          );
        }

        if (!normalized?.id) {
          normalized = {
            ...activeConversation,
            ...rawConversation,
            id: persistedId,
            isDraft: false,
            recipientId: undefined,
            preview: sentMessage
              ? messagePreview(sentMessage)
              : content || (imagesToSend.length ? "📷 Image" : ""),
            time: formatTime(sentMessage?.createdAt) || "Now",
            lastMessage: sentMessage || rawConversation?.lastMessage,
            participants: rawConversation?.participants?.length
              ? rawConversation.participants
              : activeConversation.participants,
          };
        } else {
          normalized = {
            ...activeConversation,
            ...normalized,
            isDraft: false,
            recipientId: undefined,
            preview: sentMessage
              ? messagePreview(sentMessage)
              : content || "📷 Image",
            time: formatTime(sentMessage?.createdAt) || "Now",
            lastMessage: sentMessage || normalized.lastMessage,
          };
        }

        setConversations((current) => [
          normalized,
          ...current.filter(
            (conversation) =>
              conversation.id !== conversationId &&
              conversation.id !== normalized.id,
          ),
        ]);
        if (sentMessage && typeof sentMessage === "object") {
          setMessages((current) => ({
            ...current,
            [normalized.id]: appendUniqueMessage(
              current[normalized.id] ?? [],
              sentMessage,
            ),
          }));
        }
        setMessage("");
        imagesToSend.forEach(({ preview }) => URL.revokeObjectURL(preview));
        setSelectedImages([]);
        if (activeConversation.isDraft) {
          selectConversation(normalized.id);
        }
      } catch (error) {
        setChatError(error.message || "Your message could not be sent.");
      } finally {
        setIsSendingMessage(false);
      }
      return;
    }

    const pendingMessage = {
      id: `pending-${Date.now()}`,
      content,
      sender: currentUserId,
      createdAt: new Date().toISOString(),
      read: false,
      conversationId,
      mine: true,
      pending: true,
    };
    setMessages((current) => ({
      ...current,
      [conversationId]: [...(current[conversationId] ?? []), pendingMessage],
    }));
    socketRef.current.emit("send_message", {
      conversationId,
      content,
    });
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, preview: content, time: "Now", lastMessage: pendingMessage }
          : conversation,
      ),
    );
    setMessage("");
  };

  const activeMessages = activeConversation
    ? messages[activeConversation.id] ?? []
    : [];
  const unreadTotal = conversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0,
  );

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const frameId = requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [activeId, activeMessages.length, typingUser]);

  return (
    <section className="flex h-[calc(100dvh-8.5rem)] min-h-0 bg-white lg:h-dvh">
      <aside
        className={`${
          activeConversation ? "hidden md:flex" : "flex"
        } w-full shrink-0 flex-col border-r border-slate-100 md:w-[19rem] lg:w-[22rem]`}
      >
        <div className="px-5 pb-3 pt-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h1 className="mt-1 text-2xl font-semibold  text-slate-900">
                Messages
              </h1>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setShowContacts((visible) => !visible);
              }}
              className="flex h-10 items-center gap-2 rounded-xl bg-teal-700 px-3 text-sm font-medium text-white transition hover:bg-teal-800"
              aria-expanded={showContacts}
            >
              <MessageCircle size={16} />
              <span>{showContacts ? "Chats" : "New chat"}</span>
            </button>
          </div>

          <label className="flex h-11 items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 text-slate-400 ring-1 ring-inset ring-slate-100 focus-within:ring-teal-600">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={showContacts ? "Find someone to message" : "Search messages"}
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              aria-label={showContacts ? "Search people" : "Search conversations"}
            />
            <SlidersHorizontal size={16} className="text-slate-400" />
          </label>

          {!showContacts && (
            <div className="mt-4 flex gap-2" aria-label="Conversation filter">
              {[
                { id: "all", label: "All messages" },
                { id: "unread", label: "Unread" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    filter === tab.id
                      ? "bg-teal-50 text-teal-800"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                  {tab.id === "unread" && unreadTotal > 0 && (
                    <span className="ml-1.5 text-teal-700">{unreadTotal}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-2 pb-4">
          {chatError && (
            <p
              role="alert"
              className="mx-2 mt-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2.5 text-xs text-rose-700"
            >
              {chatError}
            </p>
          )}
          <p className="px-3 pb-2 pt-3 text-sm font-semibold text-slate-400">
            {showContacts ? "Start a conversation" : "Recent"}
          </p>
          {showContacts ? (
            loadingMutuals ? (
              <p className="px-3 py-8 text-center text-sm text-slate-400">
                Finding your connections…
              </p>
            ) : mutualsError ? (
              <p className="px-3 py-8 text-center text-sm text-rose-600">
                We couldn’t load your connections. Please try again.
              </p>
            ) : visibleMutuals.length ? (
              visibleMutuals.map((contact, index) => {
                const person = getPerson(contact);
                const name = personName(person) || "SCAH member";
                const item = {
                  name,
                  initials: makeInitials(name),
                  picture:
                    person.picture ||
                    person.profilePicture ||
                    person.avatar ||
                    person.image ||
                    person.photo ||
                    "",
                  color: avatarColors[index % avatarColors.length],
                  online: Boolean(person.online || person.isOnline),
                };
                return (
                  <button
                    key={getEntityId(contact?.user ?? contact) || name}
                    type="button"
                    onClick={() => startConversation(contact)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <Avatar conversation={item} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">
                        {name}
                      </span>
                  
                    </span>
                    <span className="text-xs font-medium text-teal-700">Message</span>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-10 text-center">
                <p className="text-sm font-medium text-slate-700">
                  {mutuals.length ? "No connections match your search" : "No connections to message yet"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Connect with people in your network to start a chat.
                </p>
              </div>
            )
          ) : loadingConversations && !conversations.length ? (
            <p className="px-3 py-8 text-center text-sm text-slate-400">
              Loading your conversations…
            </p>
          ) : visibleConversations.length ? (
            visibleConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => selectConversation(conversation.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  activeId === conversation.id
                    ? "bg-teal-50/80"
                    : "hover:bg-slate-50"
                }`}
              >
                <Avatar conversation={conversation} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-slate-900">
                      {conversation.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-slate-400">
                      {conversation.time}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500">
                    {conversation.preview}
                  </span>
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1.5 text-[10px] font-semibold text-white">
                    {conversation.unreadCount}
                  </span>
                )}
              </button>
            ))
          ) : (
            <div className="px-3 py-10 text-center">
              <p className="text-sm font-medium text-slate-700">
                {filter === "unread" ? "You’re all caught up" : "No conversations yet"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Start a chat with someone in your network.
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-slate-100 px-5 py-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className={`h-2 w-2 rounded-full ${
                socketConnected ? "bg-emerald-500" : "bg-amber-400"
              }`}
            />
            {socketConnected ? "Connected to chat" : "Reconnecting to chat…"}
          </div>
        </div>
      </aside>

      <div
        className={`${
          activeConversation ? "flex" : "hidden md:flex"
        } min-w-0 flex-1 flex-col bg-[#fcfdfd]`}
      >
        {activeConversation ? (
          <>
            <header className="flex min-h-[4.5rem] items-center justify-between border-b border-slate-100 bg-white px-4 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const currentId = activeIdRef.current;
                    if (currentId && socketRef.current?.connected) {
                      stopTyping(currentId);
                      socketRef.current.emit("leave_conversation", {
                        conversationId: currentId,
                      });
                    }
                    activeIdRef.current = "";
                    setActiveId("");
                  }}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 md:hidden"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft size={19} />
                </button>
                {activeConversation.profileId ? (
                  <Link
                    href={`/profile/${encodeURIComponent(activeConversation.profileId)}`}
                    aria-label={`View ${activeConversation.name}'s profile`}
                    className="shrink-0 rounded-full transition hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                  >
                    <Avatar conversation={activeConversation} size="lg" />
                  </Link>
                ) : (
                  <Avatar conversation={activeConversation} size="lg" />
                )}
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-slate-900">
                    {activeConversation.name}
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                    {typingUser ? (
                      <span className="font-medium text-teal-700">
                        {typingUser.name ||
                          `${typingUser.firstName || ""} ${typingUser.lastName || ""}`.trim() ||
                          activeConversation.name}{" "}
                        is typing…
                      </span>
                    ) : joinedConversationId === activeConversation.id ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Connected
                      </>
                    ) : (
                      activeConversation.role || "SCAH member"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                
              </div>
            </header>

            {chatError && (
              <div className="border-b border-rose-100 bg-rose-50 px-4 py-2.5 text-sm text-rose-700" role="alert">
                {chatError}
              </div>
            )}
            <div className="flex items-center justify-center gap-2 px-4 py-3 text-center text-xs text-slate-400">
              <Sparkles size={14} className="text-teal-600" />
            </div>

            <div
              ref={messagesContainerRef}
              className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-8"
            >
              {loadingMessages && !activeMessages.length ? (
                <p className="py-12 text-center text-sm text-slate-400">
                  Loading messages…
                </p>
              ) : activeMessages.length ? (
                activeMessages.map((item, index) => {
                  const senderId = getEntityId(item.sender);
                  const mine = item.mine ?? Boolean(currentUserId && senderId === currentUserId);
                  return (
                    <div
                      key={messageId(item) || item.id || `${item.createdAt}-${index}`}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
                          mine
                            ? "rounded-br-md bg-teal-700 text-white"
                            : "rounded-bl-md border border-slate-100 bg-white text-slate-700"
                        }`}
                      >
                        {item.content && (
                          <p className="whitespace-pre-wrap text-sm leading-6">
                            {item.content}
                          </p>
                        )}
                        {messageAttachments(item).length > 0 && (
                          <div
                            className={`grid gap-2 ${
                              item.content ? "mt-2" : ""
                            } ${
                              messageAttachments(item).length === 1
                                ? "grid-cols-1"
                                : "grid-cols-2"
                            }`}
                          >
                            {messageAttachments(item).map((attachment, imageIndex) => (
                              <a
                                key={`${attachment.url}-${imageIndex}`}
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open image ${imageIndex + 1} in a new tab`}
                                className="block overflow-hidden rounded-xl"
                              >
                                <img
                                  src={attachment.url}
                                  alt={attachment.originalName || "Chat attachment"}
                                  className="max-h-72 w-full max-w-sm rounded-xl object-cover"
                                  loading="lazy"
                                />
                              </a>
                            ))}
                          </div>
                        )}
                        <div
                          className={`flex items-center justify-end gap-1 text-[10px] ${
                            item.content || messageAttachments(item).length
                              ? "mt-1.5"
                              : ""
                          } ${
                            mine ? "text-teal-100" : "text-slate-400"
                          }`}
                        >
                          {formatTime(item.createdAt) || "Sending…"}
                          {mine && !item.pending && item.read && (
                            <CheckCheck size={13} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <MessageCircle size={24} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-800">
                    Start a conversation
                  </p>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                    Say hello to {activeConversation.name} and get the conversation going.
                  </p>
                </div>
              )}
              {typingUser && (
                <div className="flex justify-start" aria-live="polite">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 text-xs text-slate-500">
                    <span className="sr-only">
                      {typingUser.name || activeConversation.name} is typing
                    </span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-600" />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={sendMessage}
              className="border-t border-slate-100 bg-white p-3 md:px-6 md:py-4"
            >
              {selectedImages.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200"
                    >
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(image.id)}
                        disabled={isSendingMessage}
                        aria-label={`Remove ${image.file.name}`}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/75 text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <p className="self-end pb-1 text-xs text-slate-400">
                    {selectedImages.length}/5 images · up to 10 MB each
                  </p>
                </div>
              )}
              <div
                className="relative flex items-end gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-2 focus-within:border-teal-600"
                onKeyDown={(event) => {
                  if (event.key === "Escape" && showEmojiPicker) {
                    setShowEmojiPicker(false);
                  }
                }}
              >
                {showEmojiPicker && (
                  <div
                    id="chat-emoji-picker"
                    role="group"
                    aria-label="Choose an emoji"
                    className="absolute bottom-full right-12 z-20 mb-3 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                  >
                    <p className="mb-2 text-xs font-semibold text-slate-600">
                      Custom emojis
                    </p>
                    <div className="grid grid-cols-6 gap-1">
                      {chatEmojis.map(({ emoji, label }) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => insertEmoji(emoji)}
                          aria-label={label}
                          title={label}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-xl transition hover:bg-teal-50 focus:bg-teal-50 focus:outline-none"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  aria-label="Add an image"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isSendingMessage || selectedImages.length >= 5}
                  className="mb-0.5 rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ImagePlus size={19} />
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  multiple
                  hidden
                  onChange={handleImageSelection}
                  aria-label="Choose images to attach"
                />
                <textarea
                  ref={messageInputRef}
                  value={message}
                  onChange={handleMessageChange}
                  disabled={isSendingMessage}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form.requestSubmit();
                    }
                  }}
                  placeholder="Write a message..."
                  rows={1}
                  className="max-h-28 min-h-10 flex-1 resize-y bg-transparent px-1 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  aria-label="Write a message"
                />
                <button
                  type="button"
                  aria-label="Add emoji"
                  aria-expanded={showEmojiPicker}
                  aria-controls={showEmojiPicker ? "chat-emoji-picker" : undefined}
                  onClick={() => setShowEmojiPicker((current) => !current)}
                  className="mb-0.5 rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-teal-700"
                >
                  <Smile size={19} />
                </button>
                <button
                  type="submit"
                  disabled={(!message.trim() && !selectedImages.length) || isSendingMessage}
                  className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                  aria-label="Send message"
                >
                  {isSendingMessage ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <Send size={17} />
                  )}
                </button>
              </div>
              
            </form>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <MessageCircle size={28} />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Your next connection starts here
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Choose a conversation or find someone in your network to send a message.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
