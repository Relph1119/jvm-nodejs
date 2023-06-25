/**
 * @author: HuRuiFeng
 * @file: Factory.js
 * @time: 2019/10/17 23:33
 * @desc: 根据操作码创建具体的指令
 */

const format = require('string-format');
const INVOKE_NATIVE = require("./reserved/Invokenative").INVOKE_NATIVE;
const MULTI_ANEW_ARRAY = require("./references/Multianewarray").MULTI_ANEW_ARRAY;
const ARRAY_LENGTH = require("./references/ArrayLength").ARRAY_LENGTH;
const ANEW_ARRAY = require("./references/Anewarray").ANEW_ARRAY;
const NEW_ARRAY = require("./references/Newarray").NEW_ARRAY;
const SASTORE = require("./stores/Xastore").SASTORE;
const CASTORE = require("./stores/Xastore").CASTORE;
const BASTORE = require("./stores/Xastore").BASTORE;
const AASTORE = require("./stores/Xastore").AASTORE;
const DASTORE = require("./stores/Xastore").DASTORE;
const FASTORE = require("./stores/Xastore").FASTORE;
const LASTORE = require("./stores/Xastore").LASTORE;
const IASTORE = require("./stores/Xastore").IASTORE;
const SALOAD = require("./loads/Xaload").SALOAD;
const CALOAD = require("./loads/Xaload").CALOAD;
const BALOAD = require("./loads/Xaload").BALOAD;
const AALOAD = require("./loads/Xaload").AALOAD;
const DALOAD = require("./loads/Xaload").DALOAD;
const FALOAD = require("./loads/Xaload").FALOAD;
const LALOAD = require("./loads/Xaload").LALOAD;
const IALOAD = require("./loads/Xaload").IALOAD;
const INVOKE_INTERFACE = require("./references/Invokeinterface").INVOKE_INTERFACE;
const INVOKE_STATIC = require("./references/Invokestatic").INVOKE_STATIC;
const ARETURN = require("./control/Return").ARETURN;
const RETURN = require("./control/Return").RETURN;
const DRETURN = require("./control/Return").DRETURN;
const FRETURN = require("./control/Return").FRETURN;
const LRETURN = require("./control/Return").LRETURN;
const IRETURN = require("./control/Return").IRETURN;
const INVOKE_SPECIAL = require("./references/Invokespecial").INVOKE_SPECIAL;
const INVOKE_VIRTURL = require("./references/Invokevirtual").INVOKE_VIRTURL;
const PUT_FIELD = require("./references/Putfield").PUT_FIELD;
const GET_FIELD = require("./references/Getfield").GET_FIELD;
const PUT_STATIC = require("./references/Putstatic").PUT_STATIC;
const GET_STATIC = require("./references/Getstatic").GET_STATIC;
const INSTANCE_OF = require("./references/Instanceof").INSTANCE_OF;
const CHECK_CAST = require("./references/Checkcast").CHECK_CAST;
const NEW = require("./references/New").NEW;
const LDC2_W = require("./constants/Ldc").LDC2_W;
const LDC_W = require("./constants/Ldc").LDC_W;
const LDC = require("./constants/Ldc").LDC;
format.extend(String.prototype);
const GOTO_W = require("./extended/Gotow").GOTO_W;
const IFNONNULL = require("./extended/Ifnull").IFNONNULL;
const IFNULL = require("./extended/Ifnull").IFNULL;
const WIDE = require("./extended/Wide").WIDE;
const LOOKUP_SWITCH = require("./control/Lookupswitch").LOOKUP_SWITCH;
const TABLE_SWITCH = require("./control/Tableswitch").TABLE_SWITCH;
const GOTO = require("./control/Goto").GOTO;
const IF_ACMPNE = require("./comparisons/Ifacmp").IF_ACMPNE;
const IF_ACMPEQ = require("./comparisons/Ifacmp").IF_ACMPEQ;
const IF_ICMPLE = require("./comparisons/Ificmp").IF_ICMPLE;
const IF_ICMPGT = require("./comparisons/Ificmp").IF_ICMPGT;
const IF_ICMPGE = require("./comparisons/Ificmp").IF_ICMPGE;
const IF_ICMPLT = require("./comparisons/Ificmp").IF_ICMPLT;
const IF_ICMPNE = require("./comparisons/Ificmp").IF_ICMPNE;
const IF_ICMPEQ = require("./comparisons/Ificmp").IF_ICMPEQ;
const IFLE = require("./comparisons/Ifcond").IFLE;
const IFGT = require("./comparisons/Ifcond").IFGT;
const IFGE = require("./comparisons/Ifcond").IFGE;
const IFLT = require("./comparisons/Ifcond").IFLT;
const IFNE = require("./comparisons/Ifcond").IFNE;
const IFEQ = require("./comparisons/Ifcond").IFEQ;
const DCMPG = require("./comparisons/Dcmp").DCMPG;
const DCMPL = require("./comparisons/Dcmp").DCMPL;
const FCMPG = require("./comparisons/Fcmp").FCMPG;
const FCMPL = require("./comparisons/Fcmp").FCMPL;
const LCMP = require("./comparisons/Lcmp").LCMP;
const I2S = require("./conversions/I2x").I2S;
const I2C = require("./conversions/I2x").I2C;
const I2B = require("./conversions/I2x").I2B;
const D2F = require("./conversions/D2x").D2F;
const D2L = require("./conversions/D2x").D2L;
const D2I = require("./conversions/D2x").D2I;
const F2D = require("./conversions/F2x").F2D;
const F2L = require("./conversions/F2x").F2L;
const F2I = require("./conversions/F2x").F2I;
const L2D = require("./conversions/L2x").L2D;
const L2F = require("./conversions/L2x").L2F;
const L2I = require("./conversions/L2x").L2I;
const I2D = require("./conversions/I2x").I2D;
const I2F = require("./conversions/I2x").I2F;
const I2L = require("./conversions/I2x").I2L;
const IINC = require("./math/Iinc").IINC;
const IXOR = require("./math/Xor").IXOR;
const LXOR = require("./math/Xor").LXOR;
const LOR = require("./math/Or").LOR;
const IOR = require("./math/Or").IOR;
const LAND = require("./math/And").LAND;
const IAND = require("./math/And").IAND;
const LUSHR = require("./math/Sh").LUSHR;
const IUSHR = require("./math/Sh").IUSHR;
const LSHR = require("./math/Sh").LSHR;
const ISHR = require("./math/Sh").ISHR;
const LSHL = require("./math/Sh").LSHL;
const ISHL = require("./math/Sh").ISHL;
const DNEG = require("./math/Neg").DNEG;
const FNEG = require("./math/Neg").FNEG;
const LNEG = require("./math/Neg").LNEG;
const INEG = require("./math/Neg").INEG;
const DREM = require("./math/Rem").DREM;
const FREM = require("./math/Rem").FREM;
const LREM = require("./math/Rem").LREM;
const IREM = require("./math/Rem").IREM;
const DDIV = require("./math/Div").DDIV;
const FDIV = require("./math/Div").FDIV;
const LDIV = require("./math/Div").LDIV;
const IDIV = require("./math/Div").IDIV;
const DMUL = require("./math/Mul").DMUL;
const FMUL = require("./math/Mul").FMUL;
const LMUL = require("./math/Mul").LMUL;
const IMUL = require("./math/Mul").IMUL;
const DSUB = require("./math/Sub").DSUB;
const FSUB = require("./math/Sub").FSUB;
const LSUB = require("./math/Sub").LSUB;
const ISUB = require("./math/Sub").ISUB;
const DADD = require("./math/Add").DADD;
const FADD = require("./math/Add").FADD;
const LADD = require("./math/Add").LADD;
const IADD = require("./math/Add").IADD;
const SWAP = require("./stack/Swap").SWAP;
const DUP2_X2 = require("./stack/Dup").DUP2_X2;
const DUP2_X1 = require("./stack/Dup").DUP2_X1;
const DUP2 = require("./stack/Dup").DUP2;
const DUP_X2 = require("./stack/Dup").DUP_X2;
const DUP_X1 = require("./stack/Dup").DUP_X1;
const DUP = require("./stack/Dup").DUP;
const POP2 = require("./stack/Pop").POP2;
const POP = require("./stack/Pop").POP;
const ASTORE_3 = require("./stores/Astore").ASTORE_3;
const ASTORE_2 = require("./stores/Astore").ASTORE_2;
const ASTORE_1 = require("./stores/Astore").ASTORE_1;
const ASTORE_0 = require("./stores/Astore").ASTORE_0;
const DSTORE_3 = require("./stores/Dstore").DSTORE_3;
const DSTORE_2 = require("./stores/Dstore").DSTORE_2;
const DSTORE_1 = require("./stores/Dstore").DSTORE_1;
const DSTORE_0 = require("./stores/Dstore").DSTORE_0;
const FSTORE_3 = require("./stores/Fstore").FSTORE_3;
const FSTORE_2 = require("./stores/Fstore").FSTORE_2;
const FSTORE_1 = require("./stores/Fstore").FSTORE_1;
const FSTORE_0 = require("./stores/Fstore").FSTORE_0;
const LSTORE_3 = require("./stores/Lstore").LSTORE_3;
const LSTORE_2 = require("./stores/Lstore").LSTORE_2;
const LSTORE_1 = require("./stores/Lstore").LSTORE_1;
const LSTORE_0 = require("./stores/Lstore").LSTORE_0;
const ISTORE_3 = require("./stores/Istore").ISTORE_3;
const ISTORE_2 = require("./stores/Istore").ISTORE_2;
const ISTORE_1 = require("./stores/Istore").ISTORE_1;
const ISTORE_0 = require("./stores/Istore").ISTORE_0;
const ASTORE = require("./stores/Astore").ASTORE;
const DSTORE = require("./stores/Dstore").DSTORE;
const FSTORE = require("./stores/Fstore").FSTORE;
const LSTORE = require("./stores/Lstore").LSTORE;
const ISTORE = require("./stores/Istore").ISTORE;
const ALOAD_3 = require("./loads/Aload").ALOAD_3;
const ALOAD_2 = require("./loads/Aload").ALOAD_2;
const ALOAD_1 = require("./loads/Aload").ALOAD_1;
const ALOAD_0 = require("./loads/Aload").ALOAD_0;
const DLOAD_3 = require("./loads/Dload").DLOAD_3;
const DLOAD_2 = require("./loads/Dload").DLOAD_2;
const DLOAD_1 = require("./loads/Dload").DLOAD_1;
const DLOAD_0 = require("./loads/Dload").DLOAD_0;
const FLOAD_3 = require("./loads/Fload").FLOAD_3;
const FLOAD_2 = require("./loads/Fload").FLOAD_2;
const FLOAD_1 = require("./loads/Fload").FLOAD_1;
const FLOAD_0 = require("./loads/Fload").FLOAD_0;
const LLOAD_3 = require("./loads/Lload").LLOAD_3;
const LLOAD_2 = require("./loads/Lload").LLOAD_2;
const LLOAD_1 = require("./loads/Lload").LLOAD_1;
const LLOAD_0 = require("./loads/Lload").LLOAD_0;
const ILOAD_3 = require("./loads/Iload").ILOAD_3;
const ILOAD_2 = require("./loads/Iload").ILOAD_2;
const ILOAD_1 = require("./loads/Iload").ILOAD_1;
const ILOAD_0 = require("./loads/Iload").ILOAD_0;
const ALOAD = require("./loads/Aload").ALOAD;
const DLOAD = require("./loads/Dload").DLOAD;
const FLOAD = require("./loads/Fload").FLOAD;
const LLOAD = require("./loads/Lload").LLOAD;
const ILOAD = require("./loads/Iload").ILOAD;
const SIPUSH = require("./constants/Ipush").SIPUSH;
const BIPUSH = require("./constants/Ipush").BIPUSH;
const DCONST_1 = require("./constants/Const").DCONST_1;
const DCONST_0 = require("./constants/Const").DCONST_0;
const FCONST_2 = require("./constants/Const").FCONST_2;
const FCONST_1 = require("./constants/Const").FCONST_1;
const FCONST_0 = require("./constants/Const").FCONST_0;
const LCONST_1 = require("./constants/Const").LCONST_1;
const LCONST_0 = require("./constants/Const").LCONST_0;
const ICONST_5 = require("./constants/Const").ICONST_5;
const ICONST_4 = require("./constants/Const").ICONST_4;
const ICONST_3 = require("./constants/Const").ICONST_3;
const ICONST_2 = require("./constants/Const").ICONST_2;
const ICONST_1 = require("./constants/Const").ICONST_1;
const ICONST_0 = require("./constants/Const").ICONST_0;
const ICONST_M1 = require("./constants/Const").ICONST_M1;
const ACONST_NULL = require("./constants/Const").ACONST_NULL;
const NOP = require("./constants/Nop").NOP;

class Factory {
    static new_instruction(opcode) {

        switch (opcode) {
            case 0x00:
                return new NOP();
            case 0x01:
                return new ACONST_NULL();
            case 0x02:
                return new ICONST_M1();
            case 0x03:
                return new ICONST_0();
            case 0x04:
                return new ICONST_1();
            case 0x05:
                return new ICONST_2();
            case 0x06:
                return new ICONST_3();
            case 0x07:
                return new ICONST_4();
            case 0x08:
                return new ICONST_5();
            case 0x09:
                return new LCONST_0();
            case 0x0a:
                return new LCONST_1();
            case 0x0b:
                return new FCONST_0();
            case 0x0c:
                return new FCONST_1();
            case 0x0d:
                return new FCONST_2();
            case 0x0e:
                return new DCONST_0();
            case 0x0f:
                return new DCONST_1();
            case 0x10:
                return new BIPUSH();
            case 0x11:
                return new SIPUSH();
            case 0x12:
                return new LDC();
            case 0x13:
                return new LDC_W();
            case 0x14:
                return new LDC2_W();
            case 0x15:
                return new ILOAD();
            case 0x16:
                return new LLOAD();
            case 0x17:
                return new FLOAD();
            case 0x18:
                return new DLOAD();
            case 0x19:
                return new ALOAD();
            case 0x1a:
                return new ILOAD_0();
            case 0x1b:
                return new ILOAD_1();
            case 0x1c:
                return new ILOAD_2();
            case 0x1d:
                return new ILOAD_3();
            case 0x1e:
                return new LLOAD_0();
            case 0x1f:
                return new LLOAD_1();
            case 0x20:
                return new LLOAD_2();
            case 0x21:
                return new LLOAD_3();
            case 0x22:
                return new FLOAD_0();
            case 0x23:
                return new FLOAD_1();
            case 0x24:
                return new FLOAD_2();
            case 0x25:
                return new FLOAD_3();
            case 0x26:
                return new DLOAD_0();
            case 0x27:
                return new DLOAD_1();
            case 0x28:
                return new DLOAD_2();
            case 0x29:
                return new DLOAD_3();
            case 0x2a:
                return new ALOAD_0();
            case 0x2b:
                return new ALOAD_1();
            case 0x2c:
                return new ALOAD_2();
            case 0x2d:
                return new ALOAD_3();
            case 0x2e:
                return new IALOAD();
            case 0x2f:
                return new LALOAD();
            case 0x30:
                return new FALOAD();
            case 0x31:
                return new DALOAD();
            case 0x32:
                return new AALOAD();
            case 0x33:
                return new BALOAD();
            case 0x34:
                return new CALOAD();
            case 0x35:
                return new SALOAD();
            case 0x36:
                return new ISTORE();
            case 0x37:
                return new LSTORE();
            case 0x38:
                return new FSTORE();
            case 0x39:
                return new DSTORE();
            case 0x3a:
                return new ASTORE();
            case 0x3b:
                return new ISTORE_0();
            case 0x3c:
                return new ISTORE_1();
            case 0x3d:
                return new ISTORE_2();
            case 0x3e:
                return new ISTORE_3();
            case 0x3f:
                return new LSTORE_0();
            case 0x40:
                return new LSTORE_1();
            case 0x41:
                return new LSTORE_2();
            case 0x42:
                return new LSTORE_3();
            case 0x43:
                return new FSTORE_0();
            case 0x44:
                return new FSTORE_1();
            case 0x45:
                return new FSTORE_2();
            case 0x46:
                return new FSTORE_3();
            case 0x47:
                return new DSTORE_0();
            case 0x48:
                return new DSTORE_1();
            case 0x49:
                return new DSTORE_2();
            case 0x4a:
                return new DSTORE_3();
            case 0x4b:
                return new ASTORE_0();
            case 0x4c:
                return new ASTORE_1();
            case 0x4d:
                return new ASTORE_2();
            case 0x4e:
                return new ASTORE_3();
            case 0x4f:
                return new IASTORE();
            case 0x50:
                return new LASTORE();
            case 0x51:
                return new FASTORE();
            case 0x52:
                return new DASTORE();
            case 0x53:
                return new AASTORE();
            case 0x54:
                return new BASTORE();
            case 0x55:
                return new CASTORE();
            case 0x56:
                return new SASTORE();
            case 0x57:
                return new POP();
            case 0x58:
                return new POP2();
            case 0x59:
                return new DUP();
            case 0x5a:
                return new DUP_X1();
            case 0x5b:
                return new DUP_X2();
            case 0x5c:
                return new DUP2();
            case 0x5d:
                return new DUP2_X1();
            case 0x5e:
                return new DUP2_X2();
            case 0x5f:
                return new SWAP();
            case 0x60:
                return new IADD();
            case 0x61:
                return new LADD();
            case 0x62:
                return new FADD();
            case 0x63:
                return new DADD();
            case 0x64:
                return new ISUB();
            case 0x65:
                return new LSUB();
            case 0x66:
                return new FSUB();
            case 0x67:
                return new DSUB();
            case 0x68:
                return new IMUL();
            case 0x69:
                return new LMUL();
            case 0x6a:
                return new FMUL();
            case 0x6b:
                return new DMUL();
            case 0x6c:
                return new IDIV();
            case 0x6d:
                return new LDIV();
            case 0x6e:
                return new FDIV();
            case 0x6f:
                return new DDIV();
            case 0x70:
                return new IREM();
            case 0x71:
                return new LREM();
            case 0x72:
                return new FREM();
            case 0x73:
                return new DREM();
            case 0x74:
                return new INEG();
            case 0x75:
                return new LNEG();
            case 0x76:
                return new FNEG();
            case 0x77:
                return new DNEG();
            case 0x78:
                return new ISHL();
            case 0x79:
                return new LSHL();
            case 0x7a:
                return new ISHR();
            case 0x7b:
                return new LSHR();
            case 0x7c:
                return new IUSHR();
            case 0x7d:
                return new LUSHR();
            case 0x7e:
                return new IAND();
            case 0x7f:
                return new LAND();
            case 0x80:
                return new IOR();
            case 0x81:
                return new LOR();
            case 0x82:
                return new IXOR();
            case 0x83:
                return new LXOR();
            case 0x84:
                return new IINC();
            case 0x85:
                return new I2L();
            case 0x86:
                return new I2F();
            case 0x87:
                return new I2D();
            case 0x88:
                return new L2I();
            case 0x89:
                return new L2F();
            case 0x8a:
                return new L2D();
            case 0x8b:
                return new F2I();
            case 0x8c:
                return new F2L();
            case 0x8d:
                return new F2D();
            case 0x8e:
                return new D2I();
            case 0x8f:
                return new D2L();
            case 0x90:
                return new D2F();
            case 0x91:
                return new I2B();
            case 0x92:
                return new I2C();
            case 0x93:
                return new I2S();
            case 0x94:
                return new LCMP();
            case 0x95:
                return new FCMPL();
            case 0x96:
                return new FCMPG();
            case 0x97:
                return new DCMPL();
            case 0x98:
                return new DCMPG();
            case 0x99:
                return new IFEQ();
            case 0x9a:
                return new IFNE();
            case 0x9b:
                return new IFLT();
            case 0x9c:
                return new IFGE();
            case 0x9d:
                return new IFGT();
            case 0x9e:
                return new IFLE();
            case 0x9f:
                return new IF_ICMPEQ();
            case 0xa0:
                return new IF_ICMPNE();
            case 0xa1:
                return new IF_ICMPLT();
            case 0xa2:
                return new IF_ICMPGE();
            case 0xa3:
                return new IF_ICMPGT();
            case 0xa4:
                return new IF_ICMPLE();
            case 0xa5:
                return new IF_ACMPEQ();
            case 0xa6:
                return new IF_ACMPNE();
            case 0xa7:
                return new GOTO();

            // TODO:
            case 0xaa:
                return new TABLE_SWITCH();
            case 0xab:
                return new LOOKUP_SWITCH();
            case 0xac:
                return new IRETURN();
            case 0xad:
                return new LRETURN();
            case 0xae:
                return new FRETURN();
            case 0xaf:
                return new DRETURN();
            case 0xb0:
                return new ARETURN();
            case 0xb1:
                return new RETURN();
            case 0xb2:
                return new GET_STATIC();
            case 0xb3:
                return new PUT_STATIC();
            case 0xb4:
                return new GET_FIELD();
            case 0xb5:
                return new PUT_FIELD();
            case 0xb6:
                return new INVOKE_VIRTURL();
            case 0xb7:
                return new INVOKE_SPECIAL();
            case 0xb8:
                return new INVOKE_STATIC();
            case 0xb9:
                return new INVOKE_INTERFACE();

            // TODO:
            case 0xbb:
                return new NEW();
            case 0xbc:
                return new NEW_ARRAY();
            case 0xbd:
                return new ANEW_ARRAY();
            case 0xbe:
                return new ARRAY_LENGTH();

            // TODO:
            case 0xc0:
                return new CHECK_CAST();
            case 0xc1:
                return new INSTANCE_OF();

            // TODO:
            case 0xc4:
                return new WIDE();
            case 0xc5:
                return new MULTI_ANEW_ARRAY();
            case 0xc6:
                return new IFNULL();
            case 0xc7:
                return new IFNONNULL();
            case 0xc8:
                return new GOTO_W();
            // TODO:
            case 0xfe:
                return new INVOKE_NATIVE();
            default:
                throw new Error("Unsupported opcode: 0x{0}!".format(opcode.toString(16)));
        }

    }
}

exports.Factory = Factory;
